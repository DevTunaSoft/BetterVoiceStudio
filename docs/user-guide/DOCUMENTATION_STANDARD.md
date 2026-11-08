# VoiceBlueprint Pro documentation quality standard

**Status:** active engineering policy. This document governs the independent VoiceBlueprint Pro fork. The historical VoiceStudio translations are archival and must not be described as current fork instructions.

[User manual](README.md) · [Feature verification](feature-verification.md)

## Purpose

Keep the manual accurate, accessible, reproducible, and synchronized with source changes. A documented feature is not necessarily a verified or released feature.

## Required status vocabulary

Use one of the following classifications for every significant capability:

| Status | Evidence required | What readers may conclude |
| --- | --- | --- |
| Implemented | Source file, integration point, and reproducible automated test | Code exists; not necessarily production-tested |
| Experimental | Implementation and limitations, plus the test environment | Available only under documented constraints |
| In progress | Specific uncompleted behavior and acceptance criteria | Do not rely on it yet |
| Blocked | Named blocker, impact, and recovery action | Not safe to ship |
| Verified on CI | Workflow URL, commit SHA, operating system and exact tests | Passed that particular automated environment |
| Validated on hardware | Device/OS, installation and functional acceptance record | Tested on that actual machine |
| Released | Tag, artifact hashes, signature status and supported platforms | Official distributable exists |

Do not replace these classifications with broad phrases such as “production-ready,” “fully offline,” “100% private,” “works everywhere,” or “fully tested” without evidence that supports every part of the claim.

## Per-feature documentation contract

Every meaningful code change must update, in the same pull request:

1. The relevant user-guide page: who the feature is for, prerequisites, exact click sequence, supported platforms and expected outcome.
2. The feature verification record: status, source path, test path, CI run link, unresolved limitations and last verified commit.
3. Troubleshooting: common failures, observable symptoms, non-destructive recovery and how to export diagnostics without secrets.
4. Security and privacy notes: local vs network behavior, permission prompts, where data is stored, and which external services are optional.
5. Migration notes when app IDs, paths, project formats, models, audio assets, settings or update feeds change.
6. The handoff: what changed, which tests ran, exact pass/fail counts, what was not tested, and the next continuation point.

When documentation has not yet been translated, label it English-only rather than silently presenting upstream translations as current instructions.

## User instructions and screenshots

Write numbered procedures with the precise menu, control and label from a tested build. Do not invent buttons or imply a screenshot reflects the current build if it came from upstream. Give screenshots alt text, platform/version context and an acquisition date or commit. Avoid cropping away relevant error messages. Never include tokens, passwords, personal audio, account details or private model paths in screenshots.

Include a fallback text-only procedure for visually complex interactions and keyboard-accessible equivalents when supported. If a UI feature is unavailable in a particular build, say so directly.

## Test evidence and acceptance

Record the exact commands and their exit codes. Automated passing tests do not prove audio fidelity, voice similarity, GPU support, privacy isolation, install/uninstall behavior, or compatibility with every hardware configuration.

Before labeling a desktop release accepted, verify at minimum:

- Clean Windows x64 installation and first launch; ARM64 separately if claimed supported.
- Actual local speech generation, transcription and export with appropriately licensed models and consented test audio.
- Cold start, offline operation with already downloaded models, permission denial, missing runtime, low disk space, and interrupted model downloads.
- App restart, project reopening, data preservation, uninstall and upgrade-in-place from a supported older build.
- Update manifest discovery, signature verification, rollback/recovery, and no accidental use of upstream release feeds.
- RAM, disk and CPU behavior on the documented minimum hardware; test GPU acceleration only on supported GPUs.
- Full regression suite and security/privacy checks with captured logs and reproducible failures.

A CI build may be listed as an **artifact-only preview**, not a signed production installer. Always distinguish “passed CI” from “validated on a real machine.”

## Privacy and independent-fork ownership

VoiceBlueprint Pro is independent of the original VoiceStudio maintainers. Preserve upstream credits and license notices, but do not represent their donation pages, paid products, support inboxes, Discord channels or release downloads as owned by this fork.

No current user-facing guide may instruct users to install an upstream binary as though it contains fork changes. A fork-owned service must not be advertised before its URL, ownership, privacy policy and operating status have been verified.

Local-first describes the architecture preference, not a guarantee that every feature avoids networking. Document model downloads, update checks, optional integrations and any telemetry/diagnostic endpoints explicitly.

## Release and change-control gates

Do not merge a draft rebrand or publish a release while mandatory tests fail. Fix the root cause, add a regression case, rerun affected tests, then rerun the complete suite. When an environment cannot perform a test, mark the result **not run**, never **passed**.

Every release or handoff should identify the commit SHA, branch, open PR, test runs, artifact hashes if available, known defects, remaining manual actions and a safe rollback path.

## Documentation review checklist

- [ ] Claims are backed by code or observed behavior, with version/commit context
- [ ] Exact controls and steps match the application build
- [ ] Screenshots are genuine, dated, accessible and non-sensitive
- [ ] Setup, recovery, privacy and optional network dependencies are explained
- [ ] Legacy data paths and external-service ownership are respected
- [ ] Source, tests, README, roadmap and manual agree on capability status
- [ ] CI, real-hardware acceptance and release readiness are clearly separated
- [ ] No broken relative links, orphaned headings or misleading upstream URLs
- [ ] Handoff and next verification checkpoint are current

**Maintainer rule:** Update this standard when the evidence model or release gates change; do not rewrite historical verification records to make a new build look more complete.
