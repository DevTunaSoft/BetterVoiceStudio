# BetterVoiceStudio — Master Engineering Handoff

**Status:** Active development; NOT release ready.  
**Branch:** `engineering/modernization-foundation`  
**Base:** `main`; draft PR [#1](https://github.com/DevTunaSoft/BetterVoiceStudio/pull/1).  
**Evidence baseline:** commit `7302e98bcde978ac99954b372eab5c7b55f44ceb`; CI [42348590079](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42348590079) (running with failures observed at inspection). This document was created after that baseline; determine current HEAD before acting.  
**Directive:** Supreme Autonomous Software Engineering Directive v4.1, supplied by project owner; full requirements must be incorporated into machine-validated checkpoints. No claim that all gates are implemented.

## Purpose and non-negotiable constraints

Modernize the independent open-source BetterVoiceStudio fork of [VoiceStudio](https://github.com/debpalash/VoiceStudio) without losing working voice/audio capabilities, project data, original authorship, licenses, or third-party attribution. Remove upstream-specific paid offerings, donation requests, sponsor ads, and unsupported upstream contact routes from fork user-facing surfaces. Do not alter app IDs, update URLs, user data paths, or signing identities without migration analysis. Keep voice processing local by default and require appropriate voice consent. No successful compile alone establishes runtime functionality.

## Recovery instructions

1. Inspect current branch/HEAD and PR #1; compare with this document, do not assume this checkpoint matches HEAD.
2. Inspect latest GitHub Actions CI run for current HEAD, including individual failing job logs; previous runs were cancelled by successive commits.
3. Read `docs/roadmap/MODERNIZATION_PROGRAM.md`, `docs/roadmap/CONSOLIDATED_CAPABILITY_PROGRAM.md`, `docs/roadmap/FORK_PUBLIC_SURFACE_AUDIT.md`, `docs/FORK_AND_ATTRIBUTION.md`, and `docs/roadmap/BASELINE_AUDIT_PASS_1.md`.
4. Preserve unrelated commits and existing license notices. Do not merge until mandatory CI and platform acceptance pass.
5. For each substantial change, update this handoff, record exact SHA/evidence, and add an append-only checkpoint.

## Architecture and feature inventory (source-inspection level)

- `electron/`: Electron main/preload/renderer, legacy shared pages, TypeScript React renderer, IPC, UI tests, packaging. Some old routes still expose support/license tabs.
- `backend/`: Python audio/model/job services, including `core/job_queue.py`. Existing functionality includes model management, voice profiles, audio processing, project workflows, and diagnostics; actual end-to-end acceptance remains unverified in this branch.
- `mobile/`: Android/iOS clients and shared support contract; promotional cleanup not yet done.
- `.github/workflows/`: multi-platform CI and release workflows; existing CLA workflow still needs governance review.
- `docs/`: roadmap, upstream attribution, historical docs and translated READMEs.
- Dependency manifests include `electron/package.json` (React 19, Electron, lucide-react, TanStack), Python manifests and repository lockfiles. Resolve exact pinned versions from tracked lockfiles; do not infer them from version ranges.

## Requirements / implementation matrix

| ID | Requirement | State | Evidence / next gate |
| --- | --- | --- | --- |
| F-001 | Fork-owned documentation, attribution and licensing | Partially implemented | README, docs index, LICENSE-NOTICE and fork attribution committed; verify links |
| F-002 | Remove inherited desktop paid/donation/support promotion | Partially implemented | SupportPage, SupportSettings, shortcut and ContactPage modified; other components still exist |
| F-003 | Correct fork support, security, issue and GitHub star URLs | Partially implemented | shared links, bug reporter, star count fixed; audit all remaining consumers |
| F-004 | Preserve third-party attribution and original copyrights | In progress | `docs/FORK_AND_ATTRIBUTION.md`, `LICENSE-NOTICE.md`; audit all third-party assets |
| F-005 | Clean translated READMEs and mobile support surfaces | Not implemented | `docs/readme/README_*.md`, Android/iOS support UI |
| F-006 | Validate release IDs/updater/installers before migration | Not implemented | Packaging contract passes in CI, but identity migration not evaluated |
| Q-001 | CI compilation and Electron tests | Failed at previous baseline | CI 42348590079; inspect new run after any fixes |
| Q-002 | Desktop UI / crawler tests | Failed at previous baseline | CI 42348590079; logs required |
| Q-003 | Full automated handoff/checkpoint validation | Not implemented | This file is initial recovery baseline, not a validated system |
| S-001 | IPC trust-boundary hardening | Partially implemented | `electron/src/main/ipc.ts`, authorization tests |
| R-001 | Job queue stop/waiter settlement | Partially implemented | `backend/core/job_queue.py`, Python regression tests; concurrent submit/stop still needs review |
| P-001 | Measured performance and multi-platform runtime | Not verified | No reproducible hardware benchmark baseline recorded |

## Known defects and risks

1. **CI release blocker:** Prior Electron tests reported unsupported `GithubIcon` import; corrected in commit `8ec82b17` by using `Github`. Current CI still showed failing Electron and desktop jobs; root causes need new logs.
2. **Star misattribution:** Previously fork UI linked to fork but fetched upstream star count and displayed bundled 43,638. Corrected in commit `d1c53d34`; unverified by passing current CI.
3. **Fork attribution links:** Changed to development-branch path in commits `a5ce80b4`, `096f1a56`, `0a5b85f1`; must change to default branch after merge or use stable routing.
4. **Unsupported shared channels:** `contactLinks.js` exports empty email/license fields and aliases social URLs to repo; audit every consumer and remove misleading CTAs.
5. **Potential behavior regression:** Legacy SupportPage was replaced rather than preserving original tab behavior; evaluate route tests and existing accessibility semantics, restore functionality where compatible with fork scope.
6. **Security:** No complete dependency, secret, IPC, archive, or update audit has passed; treat as open.
7. **Mobile, translations, sponsors and installers:** Still contain upstream-specific surfaces; cleanup pending.

## Verified test evidence vs unverified claims

- CI run `42348590079` at `7302e98`: commit-identity and CLA checks passed; Electron installer contracts and Linux native package jobs passed; Electron tests and Linux/macOS desktop UI jobs had failures; remaining jobs were in progress at last inspection. These are CI job observations, not local reproduction.
- Earlier run `42347914155`: Electron TypeScript failure `GithubIcon` not exported; source fix committed later.
- `electron/tests/fork-support-links.test.mjs` added at `7302e98`; execution result not verified.
- No complete real-hardware voice workflow, performance, fuzz campaign, installation or release acceptance verified in this branch.

## Setup / build / test starting points (not claims of execution)

Inspect root README and lockfiles for required Bun/Python/uv versions. In Electron directory: `bun install --frozen-lockfile`, `bun run typecheck`, `bun run test`, `bun run build` where supported by repository CI. Python tests are defined in tracked CI/workflows; use the exact commands there. Verify Electron main/preload and desktop launch in each target OS before release. Do not substitute these suggested commands for evidence.

## Immediate exact next actions

1. Inspect full failing logs for current HEAD CI: Electron tests, Linux/macOS/Windows desktop, UI crawler. Isolate root causes, reproduce where possible, add regression tests and fix.
2. Implement a validator for master handoff completeness, checkpoint schema, evidence consistency and required source references. Integrate as a mandatory CI gate, test validator against intentionally invalid handoffs, and record real run evidence.
3. Complete desktop fork public-surface audit, then mobile/translation/sponsor/packaging audits with targeted tests.
4. Audit queue concurrency, IPC authorization, privacy and release integrity, expand fuzz/fault injection and benchmark real workflows.
5. At each step update this document and append an action-log entry before next meaningful action.

## Rollback and recovery

Changes are isolated on `engineering/modernization-foundation`; keep `main` unchanged. For a defective change, revert its exact commit on the development branch (do not force-push or rewrite shared history), rerun targeted and full applicable regression tests, and record new evidence. Restore prior working UI behavior when cleanup accidentally removes unrelated functionality. No user data migrations have been authorized or executed.

## Initial checkpoint

- Action: `BVS-HANDOFF-0001`.
- Environment: GitHub connector, remote repository; no verified local working tree.
- Source baseline: `7302e98bcde978ac99954b372eab5c7b55f44ceb`.
- Objective: establish independent recovery document and honest CI defect register under Directive v4.1.
- Verification: source and CI metadata inspected through GitHub; no handoff validator or local build executed.
- Next: inspect CI failures and implement machine-checkable handoff gate.

## Check-in checkpoint BVS-HANDOFF-0002

GitHub Actions handoff run [42349254076](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42349254076) passed the structure validator but failed Python unittest discovery because importing unrelated `tests/probe` required unavailable NumPy. The workflow now executes `python3 tests/test_handoff_validator.py` directly (commit `c648e4bb`). CI [42349254341](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42349254341) showed the replacement `Github` import also is not exported by this installed lucide-react; replaced with `StarIcon`, already used by `github-star.tsx` (commit `775635b5`). Both corrections remain **unverified by a completed passing post-fix run**. Next: inspect current-HEAD CI, resolve any further errors, and strengthen validator evidence consistency. Roll back with targeted git revert if a correction regresses behavior; never force-push.

## Documentation checkpoint BVS-DOC-0001

A living user manual was introduced at `docs/user-guide/README.md` with installation, models, workflows, troubleshooting and feature-verification chapters. These pages explicitly distinguish intended workflows from tested UI steps; no unsupported screenshots or installer instructions were invented. Documentation acceptance rule: each user-facing feature change must update its chapter in the same development cycle and cite functional evidence before claiming verification. Initial chapter commits: `0261ae09`, `fb346fab`, `47065622`, `449c938c`, `12202583`, `3a62b101`. The pages are source-committed, **not yet user-tested or CI-gated**. Next: add documentation link to root index, automate chapter existence checks, and add screenshots only after actual UI acceptance. Rollback: revert the documentation commits if they cause an unintended publishing conflict.

## Documentation checkpoint BVS-DOC-0002

Introduced `docs/user-guide/DOCUMENTATION_STANDARD.md` defining mandatory end-user workflow fields, screenshots/provenance, accessibility, privacy, troubleshooting, recovery, platform matrix, independent verification and documentation release gates. Linked from the user guide. Added `scripts/validate_user_guide.py` to check required chapters/sections and relative Markdown links, and added it to `.github/workflows/handoff-validation.yml`. Structural validation is **not** functional UI verification. Post-commit CI results pending; see `handoff/ACTION_LOG.jsonl` for commit context. Next: review current CI, fix any validation errors and verify instructions against real app builds. Rollback: revert affected commits on branch if necessary; no history rewrite.

## QA checkpoint BVS-QA-0003

CI run [42349639499](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42349639499) completed with failures in Electron renderer/unit tests, Python branding/translation/sponsor tests, and desktop UI on Windows/macOS/Linux; all three UI crawlers, installer contracts, Linux native package, and handoff validation passed. Inspected inherited `support-settings.test.tsx`: it asserted upstream PayPal, Ko-fi, sponsors and Pro controls that are intentionally absent in the fork. Replaced with tests of fork issue/source/private-security/credits links, absence of inherited monetization, and user-triggered navigation (commit `faadd9af`). Updated `github-star.test.tsx` to expect fork API/repository and zero bundled stars rather than upstream count (commit `f2ecef59`). **Both edits are committed but not yet CI verified.** Next: rerun/inspect Electron tests, preserve attribution, diagnose platform desktop failures, then address Python readme test contracts without suppressing meaningful coverage. Revert targeted commits if regression is established.

## QA checkpoint BVS-QA-0004

Updated `tests/test_voicestudio_branding.py` to validate the root README's BetterVoiceStudio identity, independent-fork declaration, upstream repository attribution and fork release link rather than demanding removed upstream README marketing text/logo. Retained checks for actual runtime compatibility identifiers and existing shared brand assets (commit `732914ed`). Full post-fix CI pending. Outstanding inherited translated README/sponsor/contributor expectations require separate investigation; do not delete tests wholesale. The prior CI run `42350511796` was in progress when inspected. Next: inspect current HEAD CI results, fix actual application failures and rerun regression suites. Rollback via targeted revert if needed.

## QA checkpoint BVS-QA-0005

Found a real misrouting defect: original author contributor card displayed `palash.dev` and `@idebpalash` but linked both to fork repository through `WEBSITE_URL`/`X_URL`. Restored original author URLs only in attribution card (`f6ffb3d`); fork-owned support links remain fork-owned. Updated homepage contributor-directory test to expect the fork contributors URL (`806bed2`). GitHub changes verified as committed; **post-change CI and desktop runtime unverified**. Remaining blocker: desktop network isolation test assertions across Windows/macOS/Linux, setup-support timeout, Python inherited README translations/sponsor expectations. Next review full CI and fix root causes without disabling meaningful tests. Revert these targeted commits if regression proven.

## QA checkpoint BVS-QA-0006 — handoff integrity hardening

User-supplied autonomous engineering directive version 4.1 calls for validated, cumulative handoffs after every meaningful action, reproducible evidence, and distinct fault testing. Improved `scripts/validate_handoff.py` to reject blank JSONL checkpoint lines and malformed or timezone-naive timestamps (`ce82c8c`), and expanded `tests/test_handoff_validator.py` to cover invalid/naive/valid timestamps and blank records (`41459d0`, corrected fixture in `996ca8a`). Existing action-log records were checked for timezone-aware ISO timestamps. No local test or build execution claimed; **post-change CI pending**. Known risks: validator remains structural rather than independently validating referenced commits/files or test evidence, and comprehensive directive coverage remains incomplete. Next: inspect handoff CI results; expand evidence consistency checks conservatively; investigate desktop network isolation and inherited README/renderer failures. Rollback with targeted reverts of these commits if the gate malfunctions.

## QA checkpoint BVS-QA-0007 — unsolicited GitHub network requests

Latest full CI `42351284525` failed 7 jobs. Linux desktop integration log unequivocally reported `Requests left the machine` with `https://api.github.com/repos/DevTunaSoft/BetterVoiceStudio`; React `GithubStar` was mounted on startup and React Query fetched that endpoint automatically. **Root cause:** unconditional query `enabled` defaulted on (except preview flag) and 20-minute polling. **Correction:** `electron/src/renderer/src/components/app-shell/github-star.tsx` now sets `enabled: false`, removes autonomous polling, and lets an explicit user refresh button invoke `stars.refetch()` (`878b3ce`). Added regression tests for no automatic request and explicit requests (`6fbfa51`). Separately fixed setup-support UI labeling from Discord to community discussions (`aa292fb`), and updated its stale upstream Discord URL test to reference the fork community URL (`e1d27dc`). None of these changes relax desktop outbound-request guards. GitHub commits verified; **post-change test/build outcomes still pending**. Residual risks: test React tooltip composition, live-count accessibility/localization, inherited Python README translations/sponsor/contributor script failures, two renderer smokes, combined tests. Exact next action: inspect CI results and logs and resolve actual remaining failures, then run regressions. Revert the individual commits if necessary.

## QA checkpoint BVS-QA-0008 — locale source key and catalog parity

CI `42380618888` failed Electron and desktop preflight on `Renderer uses 1 i18n key(s) absent from en.json: setupHelp.community`. Source `setup-support.tsx` introduced this key while `en.json` lacked it. Fixed English source catalog and all 21 additional locale JSON catalogs with English fallback text `Community discussions` (not claimed as translated). GitHub branch commits verified through contents API, ending `d96b28d`; **post-change locale checker and desktop test results not yet verified**. Localization debt: translate this key into all 21 target languages rather than ship fallback English. Existing network privacy fix from BVS-QA-0007 must be verified in desktop integration after preflight clears. Remaining failures from earlier full CI: Python README translation/sponsor/contributor expectations, renderer smoke scripts, backend/frontend combined tests. Next: inspect new CI, fix issues without weakening gates, update action log and master handoff. Rollback: revert locale changes if source catalog contract breaks; never remove locale coverage checks.

## QA checkpoint BVS-QA-0009 — fork support regression repair

Baseline CI [42389099599](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42389099599): Windows/macOS/Linux desktop UI, three crawlers, Linux packaging and installer contracts passed; 13 Electron tests failed in ContactPage/SupportPageSections/SupportPageSponsors/bugReport/AboutTab, and renderer smokes `support-smoke.mjs` and `error-recovery-smoke.mjs` timed out waiting for removed upstream donation heading. The failure is stale test contracts after intentional fork support changes. Updated five Electron test files to assert actual fork URLs, accessible issue/private security reporting, route continuity, attribution and absence of unsupported donations; updated two renderer smoke scripts to verify actual fork support and error recovery instead of removed donation UI. No app code was changed; full post-change CI [42391348514](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42391348514) pending at checkpoint; do not claim tests pass until verified. Python README translation/sponsor/contributor tests still require correction. Recovery: inspect newest run at branch HEAD; if any assertions fail inspect logs and fix; preserve independent README and upstream credits. Rollback by targeted revert of changes in BVS-QA-0009.

## QA checkpoint BVS-QA-0010 — historical README and Python test contract correction

Prior CI [42389099599](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42389099599) failed Python because the new independent fork README intentionally does not contain the original upstream's translated section anchors, sponsor advertisements or contributor avatar row. The historical translated README files remain original upstream documents. Added `tests/fixtures/legacy_upstream_readme.md`, copied from `main`'s original English README, and changed `tests/test_readme_translations.py` to verify translations against that pinned historical source (including commands, links, sections and anchors) rather than falsely demanding parity with the fork README. `README.md` now explicitly labels historical upstream translations and warns they do not describe fork releases. `scripts/update_contributors.py` updates only historical translated READMEs, preserving fork README. `tests/test_sponsors_lockstep.py` still checks historical sponsor parity but independently verifies fork README does not promote upstream sponsors. CI [42391454261](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42391454261) pending at checkpoint; tests not yet confirmed green. Combined backend+frontend gate failed only because its Python/Electron/renderer prerequisites failed; no separate root cause identified. Next: inspect latest full CI and address new failures without weakening assertions. Rollback: revert these specific commits on development branch, never rewrite main. Remaining work: native fork translations, historical mobile support cleanup, real audio and hardware validation, security and performance qualification.

## Handoff schema repair after BVS-QA-0010

Handoff validation run [42391472028](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42391472028) failed: checkpoint BVS-QA-0009 lacked the required string `changes` field. Inspection also found BVS-QA-0010 used a list for `changes` where validator requires a string. Corrected both records in place, retaining all 12 historical action IDs and substantive content; schema repairs are an exception to ordinary append-only behavior and are explicitly documented. Pre-commit local JavaScript schema check found no remaining missing required fields; GitHub Actions post-repair validation pending. Future checkpoint writers must verify required fields before committing. No claims of passing CI until latest run completes.

## QA checkpoint BVS-QA-0011 — completed CI triage and corrective changes

[CI run 42391577115](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42391577115) finished **failure**: Electron 3083/3090 passed, 7 failures in SupportPageSections/SupportPageSponsors due to an undefined React element in SupportPage; Python 13219 passed, 8 failed (CLA fork template, Docker root README, two broken README anchors/docs drift, handoff workflow action pin twice, skill README, Discord README); renderer 39/40 passed with support smoke still waiting for Report a bug. Windows/macOS/Linux desktop UI, all three crawlers, Linux native package, installer contracts, handoff validation, CLA and commit identity passed. Replaced `Github` brand icon with `GitBranch` in SupportPage as likely undefined import (needs CI confirmation). Pinned `actions/checkout` in handoff workflow. Repaired two documentation anchors. Adjusted Python tests to preserve security and historical contracts while no longer requiring fork README to advertise upstream CLA, Docker command, skills or Discord. Renderer smoke now fails fast with heading/link diagnostics rather than hanging 30 seconds; absence of contact section is not waived. **New CI is pending; do not claim resolved.** Continue from newest run on branch HEAD; inspect Electron, Python and renderer job logs; fix underlying UI issues, rerun full CI and real-world audio/GPU validation before release. No production release authorized.

## QA checkpoint BVS-QA-0012 — About identity, attribution, and active renderer support

**User requirement:** Settings → About must identify **BetterVoiceStudio** rather than the original VoiceStudio application. Updated `electron/src/shared/components/settings/AboutTab.jsx` to display BetterVoiceStudio, identify the independent local-first open-source fork, preserve original author/contributor credit, link fork source and attribution, and remove the inherited commercial-license call to action. Existing version, update, diagnostics, HF-token status and self-check controls are retained. Added explicit AboutTab regression tests. `CREDITS_URL` is centralized in `electron/src/shared/utils/contactLinks.js` and reused by legacy `SupportPage.jsx` and active `electron/src/renderer/src/features/settings/support-settings.tsx`; the current link uses the development branch and **must become a default-branch/permanent URL before release**. The active renderer SupportSettings already displays BetterVoiceStudio and was verified in its source, while the legacy AboutTab had retained upstream identity.

**CI evidence:** [run 42393871425](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42393871425) completed with Electron tests, Windows/macOS/Linux desktop UI, all three crawlers, Linux package, installer contracts, handoff, CLA and commit identity passing. Python failed `tests/scripts/test_check_docs_drift.py::test_real_repo_is_clean` (root README omitted `docs/feature-catalog.md` link) and `tests/test_dub_speaker_reanalysis.py::test_disconnect_prevents_late_reanalysis_publication` (worker entry event not guaranteed by keepalive yield). Renderer 39/40 passed, remaining `support-smoke.mjs` failed because it tested the legacy ContactPage headings whereas actual renderer uses `SupportSettings` heading `Help and contribute` and four different links. Fixed README catalog link, synchronized worker entry in test using `asyncio.to_thread(entered.wait, 5)`, and rewrote renderer support smoke to assert the active screen and all four fork destinations without weakening monetization guard. **Post-change CI not yet verified; release blocked.** Continue at latest branch HEAD, inspect test logs, resolve regressions and complete real-world audio/GPU/platform qualification.

## Repository About sidebar correction — external administrator action required

The user provided a screenshot of the **GitHub repository About sidebar**, not the application's Settings → About. On 2026-11-07 the repository REST metadata was checked and confirmed to be stale: `description = "VoiceStudio is the open-source, fully-local ElevenLabs alternative — voice cloning, voice design, video dubbing, dictation, transcription & audiobook creation in 646 languages."` and `homepage = "https://voicestudio.sh"`. **This has NOT been changed.** The connected GitHub integration exposes no repository metadata update action; its generic fetch is GET-only. An attempt to create a tracking issue returned HTTP 410 because repository Issues are disabled (another follow-up: the fork README and active SupportSettings currently link to Issues and may lead to a disabled destination).

**Exact administrator action:** On [the repository homepage](https://github.com/DevTunaSoft/BetterVoiceStudio), click the gear icon beside **About**. Replace description with `BetterVoiceStudio is an independent, local-first open-source fork of VoiceStudio, focused on reliable AI voice generation, cloning, dubbing, transcription, and audio production.` Replace website with `https://github.com/DevTunaSoft/BetterVoiceStudio` (or clear until a verified fork-owned site exists). Optionally add topics `text-to-speech`, `voice-cloning`, `speech-synthesis`, `transcription`, `dubbing`, `open-source`. Save. Verify GitHub REST `GET /repos/DevTunaSoft/BetterVoiceStudio` reports updated description and homepage. This repository setting is independent of code commits. Ensure any future repo website is owned and verified by the fork. Resolve disabled Issues before advertising issue links or replace them with a working contribution channel. Keep attribution and license credits. No production release while mandatory CI and real-world validation are incomplete.

## QA checkpoint BVS-QA-0013 — GitHub About corrected; two remaining CI defects fixed

GitHub repository metadata was independently checked 2026-11-07: description now reads `BetterVoiceStudio — A powerful, privacy-first AI voice production suite for voice cloning, text-to-speech, dubbing, transcription, audiobooks, and advanced audio workflows. Open-source, local-first, and built for performance.` and homepage is `https://github.com/DevTunaSoft/BetterVoiceStudio`. This **resolves the stale GitHub About description and upstream website**, previously blocked on repository settings. GitHub Issues are **still disabled** (`has_issues=false`); issue-report links currently do not work and must be fixed by enabling Issues or routing to a supported working channel.

[Full CI 42395350210](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42395350210) completed **failure**: renderer smoke tests passed, all three desktop UIs and all three UI crawlers passed, installer contracts, Linux native packaging, handoff validation, CLA and commit identity passed. Electron job failed TypeScript TS2305 because `contactLinks.d.ts` did not declare the `CREDITS_URL` export added to `contactLinks.js`; added declaration. Python suite: 13225 passed, **1 failed** (`test_voicestudio_branding.py::test_brand_mark_is_shared_and_fills_the_icon`) because AboutTab replaced shared `VoiceStudioMark` with `GitBranch`; restored the existing shared brand mark while retaining **BetterVoiceStudio** identity, independent-fork disclosure and attribution links. Combined backend/frontend gate consequently failed. Fix commits were accepted on development branch. **Post-change CI pending, not verified; no production release.** Next inspect newest full CI, resolve any remaining failures, repair disabled Issues links, then complete real audio/GPU/installer acceptance and documentation before release.
