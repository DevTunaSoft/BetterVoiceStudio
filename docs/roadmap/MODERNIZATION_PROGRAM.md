# BetterVoiceStudio — Modernization Roadmap

Status: **Planning / source inspection in progress**. This document describes proposed work, not completed or tested features.

## Safety and delivery rules

- Preserve current working behavior and maintain a feature-to-test traceability matrix.
- Work on isolated branches; do not overwrite main or delete user data.
- Validate licensing for code, model weights, datasets and distribution separately.
- Never represent a successful compile as successful runtime validation.
- Record exact commit SHAs, commands, hardware, test outcomes, and limitations.
- Keep all voice samples and project content local by default; obtain explicit permission for any remote processing.
- Only support cloning and processing voices with appropriate authorization.

## Phase 0 — Baseline and discovery

1. Enumerate branches, tags, releases, issues, pull requests, workflows, dependency lockfiles, and tracked source.
2. Identify upstream divergence and establish a feature-parity baseline.
3. Map Electron main/preload/renderer trust boundaries, Python backend, models, storage, and job execution.
4. Extract linked documentation and project URLs into a research register.
5. Run original build, unit tests, packaging contracts, and smoke tests in supported environments.
6. Record reproducible startup, CPU/GPU, RAM/VRAM, throughput, and output-quality baselines.

**Gate:** No major refactoring before the baseline and regression protections exist.

## Phase 1 — P0 reliability, security, and data integrity

- Audit file access, IPC validation, backend endpoints, model downloads, updates, command invocation, and archive extraction.
- Introduce or strengthen atomic project saves, job checkpoints, idempotency, crash recovery, cancellation and bounded retries.
- Verify model provenance, checksums, license disclosures, and safe update/rollback.
- Add fault-injection tests for interrupted writes, corrupted projects, missing models, disk full, timeouts, and abrupt termination.

**Gate:** Reproduce, fix, and regression-test critical failures.

## Phase 2 — Measured performance

- Profile cold/warm startup, first audio, model switching, generation throughput and resource consumption.
- Investigate lazy loading, bounded parallelism, streaming, model cache lifecycle, quantization, CPU/GPU scheduling, and memory-pressure recovery.
- Benchmark supported engines per hardware class and avoid quality regressions.

**Gate:** Before/after results with identical workload and quality constraints.

## Phase 3 — Speech production and quality

- Inspect existing voice cloning, design, diarization, transcription, dubbing, narration and export implementations.
- Prototype pronunciation dictionaries, script-to-audio alignment, segment regeneration, silence/clipping checks, back-transcription validation, and voice-consistency checks.
- Add voice-library metadata, reference-audio checks, and documented consent/provenance controls.
- Evaluate mastering, nondestructive editing, multitrack mixing and chapter export without replacing mature components unnecessarily.

**Gate:** Real audio test fixtures and human review where perceptual quality cannot be measured automatically.

## Phase 4 — Automation and user experience

- Unify job status, queue persistence, progress, recovery, batch operations, and diagnostics.
- Improve navigation, accessibility, keyboard workflows, model compatibility guidance, and actionable errors.
- Add project export/import, versioned backups, restore verification, and reusable recipes.
- Ensure every exposed control has tested behavior.

## Phase 5 — Installation and release

- Validate fresh installs, offline operation after model installation, dependency isolation, updates, migrations, and rollback.
- Test packaging on supported Windows, macOS and Linux environments as applicable.
- Produce cumulative source, build evidence, test results, defect register, and full handoff.

## Research candidates (evaluate; do not blindly integrate)

- Chatterbox, GPT-SoVITS, OpenVoice, F5-TTS, RVC.
- Pandrator, LocalText2Voice, and established audio timeline/editing workflows.
- Inspect feature overlap, licensing, maintenance, model footprint, security, performance, and practical user value.

## Initial repository observations

- Root package reports version 0.5.7, AGPL-3.0-only, Bun 1.4.2.
- Electron package declares React, TypeScript, Vite, Electron, Vitest and packaging scripts.
- Feature catalog lists voice cloning/design, dubbing, diarization, batch queue, MCP, and multiple engines.
- README and Electron package metadata still reference upstream branding and URLs. Review carefully before rebranding; preserve legally required attribution and license notices.
- CI workflow contains substantial existing test and packaging logic. Audit it rather than replacing it without evidence.

## Verification register

| Item | Status |
| --- | --- |
| GitHub metadata and selected files | Source inspected |
| All branches and complete file tree | Not yet verified |
| Baseline build and runtime | Not executed |
| Performance benchmarks | Not executed |
| Fuzz/security audit | Not executed |
| Competitive source/license comparison | Not completed |
| Production readiness | Not established |

## Immediate next actions

1. Complete repository inventory and baseline build.
2. Create architecture and feature traceability documents.
3. Open defect register with evidence-based priorities.
4. Implement the first independently testable P0/P1 correction.
5. Rerun full affected tests and document all remaining limitations.
