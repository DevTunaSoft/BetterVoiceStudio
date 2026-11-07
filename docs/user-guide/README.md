# BetterVoiceStudio — User Guide

**Status:** Living documentation, under development. Instructions below describe intended workflows; exact controls and screenshots must be verified against the released build. **This is not a certification that the app or every feature currently works.**

BetterVoiceStudio is an independent modernization fork of VoiceStudio. It is intended for local-first voice and audio workflows. See [credits and licenses](../FORK_AND_ATTRIBUTION.md) before distributing generated material or third-party models.

## Start here

1. **Install:** Obtain an installer only from a verified BetterVoiceStudio release. Do not assume upstream VoiceStudio installers are fork releases. Current modernization builds are **not release-ready**.
2. **First launch:** Follow the application's on-screen setup and permission prompts. The precise installer and first-run steps will be documented after Windows/macOS/Linux installation acceptance tests.
3. **Models:** Open the application's model management area and inspect the available models, requirements and licenses. Exact download, selection and configuration steps require UI verification.
4. **Create a voice or audio project:** Use the application's available project/voice workflow. Only use voice recordings you own or are authorized to use. Model-specific inputs and limits will be added as each workflow is tested.
5. **Generate or process audio:** Select an appropriate installed model and use the workflow presented in the application. Verify the generated output before sharing it.
6. **Export and preserve your work:** Use the app's export/save controls if available. Project storage locations, formats, backup/restore and failure recovery instructions are pending real-platform verification.

## Workflow chapters

| Chapter | Status | What will be documented |
| --- | --- | --- |
| [Installation and first run](installation.md) | Verification pending | OS prerequisites, download authenticity, installer, permissions, startup, updates |
| [Models and resources](models.md) | Verification pending | Model choice, license, storage, CPU/GPU, download and troubleshooting |
| [Voice and audio workflows](workflows.md) | Verification pending | Creating projects, authorized voice cloning, speech generation, editing, transcription and exports |
| [Troubleshooting and recovery](troubleshooting.md) | In progress | Logs, model failures, crashes, interrupted jobs, safe recovery, support |
| [Feature verification ledger](feature-verification.md) | In progress | Exactly which controls and workflows have been tested |

## Privacy and responsible use

Treat recordings, scripts and projects as sensitive. Prefer local processing. Never clone or impersonate a voice without appropriate consent and authorization. Verify each model's license and usage terms independently.

## Reporting a problem

Use [BetterVoiceStudio issues](https://github.com/DevTunaSoft/BetterVoiceStudio/issues) for non-sensitive bugs and feature requests. For security vulnerabilities, follow the repository's [security policy](https://github.com/DevTunaSoft/BetterVoiceStudio/security/policy) and use private reporting rather than a public issue.

## Documentation acceptance rule

Every new or changed user-facing feature must update the relevant chapter **in the same development cycle**. Record: feature name, intended user, prerequisites, exact UI navigation, numbered steps, expected result, common failures, recovery, supported OS, screenshot/evidence link and verification commit. If untested, label it explicitly. Keep this guide accurate across renames and UI redesigns; do not invent buttons, installers, model compatibility or screenshots.
