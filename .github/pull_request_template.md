<!--
VoiceBlueprint Pro is an independent DevTunaSoft project.
Do not sign the original VoiceStudio CLA or post signatures to upstream issues.
The fork's contribution-licensing policy is under review; maintainers must not
merge non-exempt external contributions before an independent policy is approved.
-->

## Summary

<!-- Brief description of what this PR does. -->

## Changes

<!-- List the key changes made in this PR. -->

-

## Type

<!-- Check the one that applies. -->

- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] ♻️ Refactor
- [ ] 📝 Documentation
- [ ] 🧪 Tests
- [ ] 🔧 CI / Build
- [ ] 🚀 Release prep

## Testing

<!-- How did you test these changes? -->

-

## Checklist

- [ ] I've tested this locally
- [ ] Contributor licensing has been reviewed under the independent VoiceBlueprint Pro policy; no upstream CLA signatures were requested
- [ ] I've updated relevant documentation (if applicable)
- [ ] User-visible change: I added a one-line `changelog.d/<PR#>.<type>.md` fragment (not `CHANGELOG.md`)
- [ ] No local machine paths, logs, or personal env details in this PR
- [ ] Maintained version files are in sync (if an owner-requested bump): root `package.json`, `pyproject.toml`, `backend/core/version.py`, and lockfiles
- [ ] If this PR changes runtime behavior, the regression fixture at `tests/fixtures/omnivoice_data/` still loads green on the `smoke-matrix` CI job (macOS + Windows + Linux)

## Release cadence

VoiceBlueprint Pro is in active development. Merges require the fork's own acceptance checks; no release cadence has been approved.
Every merged PR is immediately part of rolling source (`main`) and Docker
`:latest`. Electron artifact rehearsals validate desktop packages without publishing.
Version bumps require owner approval; validated releases are tagged from `main`
and published explicitly under [the release checklist](../docs/RELEASING.md).
Users who want stability install an Electron release or pin Docker `:stable`.
