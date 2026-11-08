# Repository disaster-recovery backups

The **Full repository disaster recovery backup** workflow creates a portable, single `.tar.gz` file with a `.sha256` integrity checksum. This is not GitHub's **Download ZIP** function: the archive includes a self-contained `git/repository.bundle` with all fetched branches, tags, pull-request refs, and reachable commits. A browsable checkout of the default branch, independent submodule bundles, Git LFS objects, and GitHub metadata are also included.

## Run and download

1. Open [Actions → Full repository disaster recovery backup](../../actions/workflows/repository-backup.yml).
2. Use **Run workflow** once the workflow is present on the repository's default branch, or check the workflow run triggered by changes on `engineering/repository-backup-snapshot`.
3. Wait for a **successful** run. Open the run and download the `full-repository-backup-<run-id>` artifact.
4. Extract the GitHub artifact ZIP to obtain the `.tar.gz` archive and `.sha256` file. Copy **both files to independent, encrypted storage outside GitHub**. GitHub Actions artifacts expire after **30 days**; a green workflow alone does not make an off-site backup.

The workflow also runs weekly after it is merged to the default branch, but its results still must be exported to independent storage.

## Make a backup locally

Requirements: Bash, Git, Git LFS, GitHub CLI (`gh`), Python 3, rsync, tar and sha256sum. Authenticate the GitHub CLI with read access, then run:

```bash
export GH_TOKEN=YOUR_READ_ONLY_GITHUB_TOKEN
REPO_SLUG=DevTunaSoft/BetterVoiceStudio BACKUP_REQUIRE_METADATA=1 \
  BACKUP_OUTPUT_DIR="$HOME/Backups" bash scripts/repository_backup.sh
```

Do not commit tokens, passwords or generated backup archives to the repository.

## Verify and restore

After extracting the Actions artifact download, in the directory containing both files:

```bash
sha256sum -c DevTunaSoft-BetterVoiceStudio-*-full-backup.tar.gz.sha256
mkdir -p recovered
tar -xzf DevTunaSoft-BetterVoiceStudio-*-full-backup.tar.gz -C recovered
cd recovered/backup
sha256sum -c metadata/sha256sums.txt
git clone --mirror git/repository.bundle BetterVoiceStudio-mirror.git
git --git-dir=BetterVoiceStudio-mirror.git fsck --full
git clone BetterVoiceStudio-mirror.git BetterVoiceStudio-source
git -C BetterVoiceStudio-source branch -a
git -C BetterVoiceStudio-source log --all --oneline --decorate -15
```

The original branch name and commit SHA are in `metadata/default-branch.txt` and `metadata/default-branch-sha.txt`; the snapshot's complete refs are in `metadata/refs.txt`. To restore submodules offline, consult `metadata/submodule-bundles.tsv`, recreate each submodule from its bundle, and override its configured remote URL with the local restored submodule repository before running `git submodule update --init --recursive`. Git LFS objects are available under `lfs/root/` and `lfs/submodules/`.

## Scope and limitations

**Includes when accessible:** source on the default branch; all Git branches, tags, PR refs and reachable commit history; Git submodule checkouts and their history; Git LFS objects; repository metadata; issues, pull requests, discussion comments, PR reviews and inline comments; labels and milestones; release metadata and downloadable release assets; workflow definitions from source and GitHub Actions workflow/run metadata.

**Does not claim to include:** GitHub secrets or credentials, Actions job logs and expired artifacts, runner caches, local uncommitted changes, previously deleted/unreachable commits, private inaccessible submodules, outside repositories, unexported GitHub Projects settings, deployment infrastructure, source code in third-party tools, or independent cloud services. GitHub fork relationships cannot be recreated from Git history alone. If GitHub API permissions or a required submodule/LFS download fail, the job should fail rather than report a complete snapshot.

For high confidence, retain **multiple dated copies** on two independent storage locations, periodically restore a copy to a disposable machine, verify file hashes and Git refs, and verify the application still builds. Never conflate a successful archive upload with a tested application build.
