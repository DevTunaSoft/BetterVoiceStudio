# BetterVoiceStudio: fork origin, attribution, and development direction

## Origin and independence

**BetterVoiceStudio** is an independent development fork hosted at https://github.com/DevTunaSoft/BetterVoiceStudio. Its upstream starting point is **VoiceStudio** at https://github.com/debpalash/VoiceStudio. The inherited codebase includes OmniVoice-related components and retains many upstream names, paths, identifiers, examples, screenshots, documentation, and installation instructions.

This is **not** an official upstream release, endorsement, commercial offering, or replacement for upstream download channels. Credit for inherited code, design, documentation and features belongs to their respective authors and contributors. Fork changes are tracked in Git history. Do not represent inherited functionality as invented by this fork.

The repository's root package currently declares `AGPL-3.0-only`. Review [LICENSE](../LICENSE) and individual component/model/data licenses before redistribution or commercial deployment; model weights and datasets may have separate terms.

## Explicit third-party and upstream credits

These are identified in the inherited [license notice](../LICENSE-NOTICE.md) and repository files; attribution does not imply endorsement of this fork.

| Source or component | Credit and license evidence |
| --- | --- |
| **VoiceStudio** | Original project by **Palash Debnath and VoiceStudio contributors**. [Upstream repository](https://github.com/debpalash/VoiceStudio); original copyright and AGPL notices retained. |
| **OmniVoice** | Underlying speech-model implementation credited to **Han Zhu and upstream authors**. The inherited [license notice](../LICENSE-NOTICE.md) identifies the bundled `omnivoice/` Python package as Apache-2.0; inspect package notices for details. |
| **T3 Code** | Electron components adapted from T3 Code retain their MIT notice at [`electron/T3CODE-LICENSE.txt`](../electron/T3CODE-LICENSE.txt). |
| **Model authors and providers** | Each model and weight artifact may have separate rights. Consult [model credits](model-credits.md), [model license inventory](../backend/config/model_licenses.json) and original model cards. |
| **FFmpeg and media libraries** | Some distributed wheels bundle separately licensed multimedia libraries; inspect the dependency and wheel notices documented in [LICENSE-NOTICE.md](../LICENSE-NOTICE.md). |
| **Other dependencies and artwork** | Original notices, license files, lockfiles and source history remain authoritative. Sponsorship artwork, where still included as historical assets, is **not** a current BetterVoiceStudio sponsor endorsement. |

**Open-source attribution is not advertising.** Keep links to original source and legally required notices; remove or clearly isolate links that ask users to buy, donate, subscribe, or install something offered by another project. Do not erase copyright history or rename a third-party contribution as our own.

## Fork-only public-facing policy

The main README, issue templates, and fork documentation must link to **DevTunaSoft/BetterVoiceStudio** for issues, releases, development CI and contributions. Original VoiceStudio links are retained for **credit and source traceability**, not as this fork's product channels. Existing upstream-specific promotional screens, translated READMEs, sponsor rosters, installation instructions, automated tests and app metadata require separate compatibility and attribution review before alteration. Do not delete third-party assets or notices solely because the fork does not advertise them.

## Why the fork was started

The aim is to evolve the existing local AI voice studio into a more reliable, secure, measurable, accessible, and integrated voice-production environment, **without losing existing functionality or duplicating working systems**.

The program encompasses:
- Job lifecycle reliability, cancellation, persistence, crash recovery and safe restart
- Project and audio integrity, checkpointing, portable exports, and recovery verification
- Security boundaries, consent/provenance, filesystem and API authorization
- Measured startup, CPU/GPU, memory, throughput and audio-quality improvements
- Better model management, hardware compatibility and reproducible production recipes
- Voice profiles, script intelligence, dubbing, audiobook workflows, editing and mastering
- Automated audio quality checks, speech-to-script verification and selective regeneration
- Production automation, accessibility, diagnostics and optional local AI assistance
- Multi-angle fuzzing, state-machine tests, fault injection, soak testing and cross-platform release qualification

These are **roadmap categories**, not a statement that all are missing or already implemented.

## Non-duplication and preservation policy

Before any feature is built:
1. Inspect the repository for existing implementations, consumers, tests, migrations, routes, settings and documentation.
2. Classify the capability as **existing**, **partial**, **needs improvement**, **missing**, or **unknown**.
3. Identify the authoritative implementation and extend it where practical. Do not build parallel job queues, model managers, audio-quality engines, or project databases merely to add functionality.
4. Preserve existing behavior and compatibility, and test migration and rollback if interfaces or storage formats change.
5. Verify changes through reproducible tests, full CI and hardware/audio validation where applicable.
6. Record the evidence, remaining risks and any reasons for introducing new dependencies.

See [Consolidated Capability Program](roadmap/CONSOLIDATED_CAPABILITY_PROGRAM.md).

## Verified progress and limitations

- A modernization program, baseline audit, and consolidated capability roadmap were committed to the development branch.
- Initial Electron IPC caller authorization checks were added, with source-level regression contracts.
- Job queue shutdown/restart handling was modified to settle outstanding jobs, and two regression tests were added.
- A **prior baseline** GitHub Actions CI run completed successfully across its scheduled jobs: [run 42343938623](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42343938623). That run **predates** the subsequent queue hardening and documentation changes; review the latest [Actions](https://github.com/DevTunaSoft/BetterVoiceStudio/actions) for their results.
- Full real-world GPU inference, voice quality, all supported OS/hardware combinations, upgrades and production deployment are **not** established by that baseline CI result.
- An initial source-path inventory found existing model management, audio-quality, project bundle, performance, voice-profile, security and fuzz-test modules. Their functional completeness has **not** been independently audited.

## Upstream documentation and downloads

Inherited README and documentation may link to `voicestudio.sh`, `debpalash/VoiceStudio`, upstream Discord, upstream sponsors, and upstream Pro/Cloud services. Those links identify **upstream services or releases**, not this fork's services or releases. Likewise, current application metadata may still say `VoiceStudio` or `OmniVoice` for compatibility. A future coordinated rebrand must review identifiers, migrations, installer IDs, app data paths, API compatibility, and user data before changing them.

For fork development, use:
- [Repository](https://github.com/DevTunaSoft/BetterVoiceStudio)
- [CI runs](https://github.com/DevTunaSoft/BetterVoiceStudio/actions)
- [Fork releases](https://github.com/DevTunaSoft/BetterVoiceStudio/releases)
- [Modernization roadmap](roadmap/MODERNIZATION_PROGRAM.md)
- [Capability program](roadmap/CONSOLIDATED_CAPABILITY_PROGRAM.md)
- [Baseline audit](roadmap/BASELINE_AUDIT_PASS_1.md)

## Documentation truth standard

Use **inherited**, **implemented**, **verified in CI**, **verified on hardware**, **planned**, and **unknown** precisely. Never describe a proposed capability as shipped, an upstream installer as a fork installer, or an untested change as production-ready. Keep this document and the main README current as code and verification evolve.
