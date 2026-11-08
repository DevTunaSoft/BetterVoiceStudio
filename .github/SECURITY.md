# BetterVoiceStudio security policy

This repository is an independent fork of [VoiceStudio](https://github.com/debpalash/VoiceStudio). Security advisories for the original project are **not** reports to BetterVoiceStudio maintainers.

## Reporting vulnerabilities

**Do not post exploitable vulnerability details in public issues.** Use [GitHub's private vulnerability reporting](https://github.com/DevTunaSoft/BetterVoiceStudio/security/advisories/new) if enabled for this repository. If unavailable, request a private reporting channel from the repository maintainers without disclosing exploit details publicly.

No response SLA or support commitment has been established for this fork. Do not rely on the original project's security email or response timelines as BetterVoiceStudio commitments.

## Scope and precautions

The application includes an Electron renderer/main process boundary, Python backend and APIs, filesystem and model downloads, audio/video parsers, installers and third-party dependencies. Do not expose the local backend publicly without appropriate authorization and network controls.

Inherited platform, model and dependency advisories remain relevant. See [LICENSE-NOTICE.md](../LICENSE-NOTICE.md), [fork attribution](../docs/FORK_AND_ATTRIBUTION.md), and [GitHub Actions](https://github.com/DevTunaSoft/BetterVoiceStudio/actions) for current verification. Fork releases and supported-version commitments must be established independently.
