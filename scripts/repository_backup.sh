#!/usr/bin/env bash
# Repository-wide disaster-recovery snapshot, not a shallow main-branch ZIP.
set -Eeuo pipefail
umask 077
REPO=${REPO_SLUG:-${GITHUB_REPOSITORY:-DevTunaSoft/BetterVoiceStudio}}
REMOTE=${BACKUP_REMOTE_URL:-https://github.com/$REPO.git}
OUT=${BACKUP_OUTPUT_DIR:-$PWD/repository-backups}
REQUIRE_METADATA=${BACKUP_REQUIRE_METADATA:-0}
mkdir -p "$OUT"
OUT=$(cd "$OUT" && pwd)
ROOT=$(mktemp -d)
trap 'rm -rf -- "$ROOT"' EXIT
mkdir -p "$ROOT/backup/git/submodules" "$ROOT/backup/lfs" "$ROOT/backup/metadata" "$ROOT/backup/releases" "$ROOT/backup/source/main"
echo "Mirroring all branches, tags and reachable commits for $REPO"
git clone --mirror "$REMOTE" "$ROOT/mirror.git"
if [[ "$REMOTE" == https://github.com/* ]]; then
  git -C "$ROOT/mirror.git" fetch --no-tags origin '+refs/pull/*/head:refs/pull/*/head' '+refs/pull/*/merge:refs/pull/*/merge' || echo "Some optional PR refs unavailable"
fi
BRANCH=$(git -C "$ROOT/mirror.git" symbolic-ref --short HEAD)
git -C "$ROOT/mirror.git" fsck --full --no-reflogs >/dev/null
git -C "$ROOT/mirror.git" bundle create "$ROOT/backup/git/repository.bundle" --all
git -C "$ROOT/mirror.git" bundle verify "$ROOT/backup/git/repository.bundle" >/dev/null
git -C "$ROOT/mirror.git" for-each-ref --format='%(refname) %(objectname)' | LC_ALL=C sort > "$ROOT/backup/metadata/refs.txt"
git -C "$ROOT/mirror.git" rev-list --all --count > "$ROOT/backup/metadata/commit-count.txt"
printf '%s\n' "$BRANCH" > "$ROOT/backup/metadata/default-branch.txt"
git -C "$ROOT/mirror.git" rev-parse "$BRANCH" > "$ROOT/backup/metadata/default-branch-sha.txt"
git clone --no-local --quiet "$ROOT/mirror.git" "$ROOT/worktree"
git -C "$ROOT/worktree" checkout -q "$BRANCH"
if [[ -f "$ROOT/worktree/.gitmodules" ]]; then
  git -C "$ROOT/worktree" -c protocol.file.allow=never submodule update --init --recursive --checkout
  : > "$ROOT/backup/metadata/submodule-bundles.tsv"
  while IFS= read -r -d '' marker; do
    sub=$(printf '%s' "$marker" | sed "s|^$ROOT/worktree/||; s|/\.git$||")
    key=$(printf '%s' "$sub" | sha256sum | cut -c1-16)
    git -C "$ROOT/worktree/$sub" fsck --full --no-reflogs >/dev/null
    git -C "$ROOT/worktree/$sub" bundle create "$ROOT/backup/git/submodules/$key.bundle" --all
    git -C "$ROOT/worktree/$sub" bundle verify "$ROOT/backup/git/submodules/$key.bundle" >/dev/null
    printf '%s\t%s\t%s\n' "$sub" "git/submodules/$key.bundle" "$(git -C "$ROOT/worktree/$sub" rev-parse HEAD)" >> "$ROOT/backup/metadata/submodule-bundles.tsv"
    if git lfs version >/dev/null 2>&1; then
      git -C "$ROOT/worktree/$sub" lfs fetch --all || { echo "Submodule LFS fetch failed" >&2; exit 1; }
      gitdir=$(git -C "$ROOT/worktree/$sub" rev-parse --absolute-git-dir)
      if [[ -d "$gitdir/lfs/objects" ]]; then
        mkdir -p "$ROOT/backup/lfs/submodules/$key"
        rsync -a "$gitdir/lfs/objects/" "$ROOT/backup/lfs/submodules/$key/"
      fi
    fi
  done < <(find "$ROOT/worktree" -mindepth 2 -type f -name .git -print0)
fi
if git lfs version >/dev/null 2>&1; then
  git -C "$ROOT/mirror.git" lfs fetch --all origin
  if [[ -d "$ROOT/mirror.git/lfs/objects" ]]; then
    mkdir -p "$ROOT/backup/lfs/root"
    rsync -a "$ROOT/mirror.git/lfs/objects/" "$ROOT/backup/lfs/root/"
  fi
else
  if git -C "$ROOT/mirror.git" grep -Il '^version https://git-lfs.github.com/spec/v1$' "$BRANCH" -- . 2>/dev/null | grep -q .; then
    echo "LFS pointers present without git-lfs; refusing incomplete backup" >&2; exit 1
  fi
fi
rsync -a --exclude='.git' "$ROOT/worktree/" "$ROOT/backup/source/main/"
if command -v gh >/dev/null 2>&1 && [[ -n "${GH_TOKEN:-${GITHUB_TOKEN:-}}" ]]; then
  export GH_TOKEN=${GH_TOKEN:-$GITHUB_TOKEN}
  gh api "repos/$REPO" > "$ROOT/backup/metadata/repository.json"
  for endpoint in branches tags issues pulls releases labels milestones; do
    case "$endpoint" in
      issues|pulls|milestones) query='state=all&per_page=100';;
      *) query='per_page=100';;
    esac
    gh api --paginate --slurp "repos/$REPO/$endpoint?$query" > "$ROOT/backup/metadata/$endpoint.json"
  done
  gh api --paginate --slurp "repos/$REPO/actions/workflows?per_page=100" > "$ROOT/backup/metadata/workflows.json"
  gh api --paginate --slurp "repos/$REPO/actions/runs?per_page=100" > "$ROOT/backup/metadata/workflow-runs.json"
  mkdir -p "$ROOT/backup/metadata/pr-details" "$ROOT/backup/metadata/issue-comments"
  python3 - "$ROOT/backup/metadata/pulls.json" "$ROOT/backup/metadata/issues.json" "$ROOT" <<'PY'
import json,sys,pathlib
prs,issues,root = map(pathlib.Path,sys.argv[1:])
def flatten(path):
    return [row for page in json.loads(path.read_text()) for row in page]
(root/'pr-list').write_text('\n'.join(str(row['number']) for row in flatten(prs)))
(root/'issue-list').write_text('\n'.join(str(row['number']) for row in flatten(issues) if 'pull_request' not in row))
PY
  while IFS= read -r number; do
    [[ "$number" =~ ^[0-9]+$ ]] || continue
    gh api "repos/$REPO/pulls/$number" > "$ROOT/backup/metadata/pr-details/$number.json"
    gh api --paginate --slurp "repos/$REPO/pulls/$number/reviews?per_page=100" > "$ROOT/backup/metadata/pr-details/$number-reviews.json"
    gh api --paginate --slurp "repos/$REPO/pulls/$number/comments?per_page=100" > "$ROOT/backup/metadata/pr-details/$number-review-comments.json"
    gh api --paginate --slurp "repos/$REPO/issues/$number/comments?per_page=100" > "$ROOT/backup/metadata/pr-details/$number-discussion.json"
  done < "$ROOT/pr-list"
  while IFS= read -r number; do
    [[ "$number" =~ ^[0-9]+$ ]] || continue
    gh api --paginate --slurp "repos/$REPO/issues/$number/comments?per_page=100" > "$ROOT/backup/metadata/issue-comments/$number.json"
  done < "$ROOT/issue-list"
  python3 - "$ROOT/backup/metadata/releases.json" > "$ROOT/release-tags" <<'PY'
import json,sys
for page in json.load(open(sys.argv[1], encoding='utf-8')):
    for r in page:
        if r.get('assets'): print(r['tag_name'])
PY
  while IFS= read -r tag; do
    [[ -n "$tag" ]] || continue
    safe_tag=$(printf '%s' "$tag" | tr -cd 'a-zA-Z0-9_.-')
    mkdir -p "$ROOT/backup/releases/$safe_tag"
    gh release download "$tag" --repo "$REPO" --dir "$ROOT/backup/releases/$safe_tag"
  done < "$ROOT/release-tags"
  echo captured > "$ROOT/backup/metadata/github-metadata-status.txt"
else
  [[ "$REQUIRE_METADATA" != 1 ]] || { echo "gh and GH_TOKEN required for metadata" >&2; exit 1; }
  echo 'not captured - missing gh or GH_TOKEN' > "$ROOT/backup/metadata/github-metadata-status.txt"
fi
cat > "$ROOT/backup/README-RESTORE.txt" <<'TEXT'
A full Git bundle, not a ZIP of only the latest code. git/repository.bundle contains all mirrored refs and reachable history. source/main/ contains browsable code. Git submodules have independent bundles under git/submodules. Git LFS content is under lfs. Restore using: git clone --mirror git/repository.bundle restored.git
GitHub secrets, deleted unreachable commits, expired CI artifacts and GitHub-managed settings are not retrievable from a Git repository backup. Keep this archive outside GitHub.
TEXT
(cd "$ROOT/backup" && find . -type f ! -path './metadata/sha256sums.txt' -print0 | LC_ALL=C sort -z | xargs -0 sha256sum) > "$ROOT/backup/metadata/sha256sums.txt"
NAME=$(printf '%s' "$REPO" | tr '/' '-')
ARCHIVE="$OUT/$NAME-$(date -u +%Y%m%dT%H%M%SZ)-full-backup.tar.gz"
tar -C "$ROOT" -czf "$ARCHIVE" backup
(cd "$OUT" && sha256sum "$(basename "$ARCHIVE")" > "$(basename "$ARCHIVE").sha256")
mkdir "$ROOT/verified"
tar -xzf "$ARCHIVE" -C "$ROOT/verified"
(cd "$ROOT/verified/backup" && sha256sum -c metadata/sha256sums.txt >/dev/null)
git -C "$ROOT/mirror.git" bundle verify "$ROOT/verified/backup/git/repository.bundle" >/dev/null
echo "Verified backup: $ARCHIVE"
