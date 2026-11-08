# BetterVoiceStudio — Consolidated Capability Program

Status: approved **roadmap**, not an assertion that every feature is absent, implemented, or tested.
Branch: engineering/modernization-foundation. Keep main unchanged until reviewed.

## Non-duplication gate (mandatory for EVERY feature)

1. Search the entire repository for existing implementations, consumers, tests, API routes, schema, migrations, and documentation. Review behavior, not just filenames.
2. Record a feature inventory row: capability; existing source of truth; consumers; status (existing / partial / needs hardening / missing / unknown); proposed reuse; acceptance criteria; test evidence; risks.
3. Prefer improving existing implementation. Never introduce a second job queue, model registry, project store, audio-quality engine, settings authority, or competing UI workflow without a documented architectural migration.
4. Preserve existing user workflows, data compatibility, interfaces, and tests. Refactor shared logic only with migration and regression coverage.
5. No feature is considered done until relevant tests and full CI pass. Actual audio, GPU, OS, installer and device claims require target-environment evidence.
6. Use small reviewable changes with defect records, reproducible tests, independent diff review, and multiple **distinct** fuzz/fault-injection rounds. No arbitrary or unbounded retries.

## Preliminary inventory — source paths verified, capabilities NOT yet fully audited

| Area | Existing implementation evidence | Required action |
| --- | --- | --- |
| Job scheduling | backend/core/job_queue.py, backend/core/job_store.py, tests/test_job_queue.py | Harden existing queue and persisted metadata; assess resumability |
| Model lifecycle | backend/services/model_manager.py, model installation hooks, model download tests | Extend existing manager, do not create a parallel one |
| Voice profiles | backend/services/voice_design_profiles.py, electron/src/shared/pages/VoiceProfile.jsx, consent migration | Inventory and extend existing profile/consent workflows |
| Audio QA | backend/services/audio_quality.py, frontend audio quality utilities, tests/test_audio_quality.py | Map current checks before proposing new quality gates |
| Projects/portability | backend/api/routers/projects.py, project_bundles.py, backend/services/project_bundle.py | Review existing project bundles before new export format |
| Dubbing/transcription | docs/electron-dubbing.md, backend/services/transcript_diarization.py, subtitle tools | Extend established pipeline and shared state |
| Security | backend/core/auth.py, path_authorization.py, electron/src/main/trusted-renderer.ts | Audit existing boundaries and coverage |
| Performance | backend/services/performance_profiles.py, performance_budget.py, docs/benchmarks.md | Benchmark and extend existing measurement tools |
| Fuzzing | tests/probe/api_fuzz.py, tests/probe/test_api_fuzz.py | Expand existing fuzz harness, avoid parallel duplicate harness |

This is an initial **file-level** inventory of the current branch, not a verified feature-completeness assessment.

## Capability backlog (all approved for evaluation, NOT unconditional implementation)

### Reliability and platform
- Transactional job state, crash-safe queues, idempotency, bounded retries, cancellation, restart and checkpoint recovery
- Database migrations, atomic writes, project snapshots, data integrity scans, safe cleanup and backup/restore verification
- Backend watchdog, health checks, diagnostic assistant, safe mode, circuit breakers and recovery dashboard
- Installation/upgrade/rollback, hardware readiness, model compatibility, portability and accessibility

### Speech and production
- Voice DNA/profile management, consent, versioning, collections, acoustic comparison, voice blending where supported
- Pronunciation dictionary, contextual delivery, director notes, emotion/pacing, alternative takes and character continuity
- Script intelligence, terminology bible, multilingual localization, speaker assignment, dialogue and dubbing alignment
- Audiobook/chapter workflows, non-destructive multitrack editing, audio restoration, mastering and export/publishing profiles
- Automatic speech-to-script verification, clipping/silence/consistency checks, selective regeneration and quality gates
- Recording calibration, reference sample quality, searchable assets and reproducible production recipes

### Intelligence and automation
- Production supervisor and visual workflow builder, batch/scheduled generation, watched folders and authorized APIs
- Intelligent engine selection, adaptive chunking, predictive runtime/memory/storage budgets and hardware-specific profiles
- Model laboratory, benchmarking, safe preloading, download integrity, version rollback and local/offline AI assistance
- Incremental dependency-aware regeneration, project search, portable bundles and optional authorized distributed processing
- Extension system with isolation, explicit permissions and compatibility controls
- Provenance, consent, privacy, auditability and optional authenticity mechanisms

### Engineering and release quality
- Property-based and state-machine fuzzing, differential/mutation tests, hostile inputs, race/deadlock checks
- Process kill, storage exhaustion, network failure, GPU OOM, corrupted records, migration failure and recovery simulation
- Long-duration soak tests, memory/fd leak detection, performance regression budgets and real audio output validation
- Cross-platform installers, upgrades, migrations, offline workflows and target hardware qualification
- Defect register, root-cause evidence, remediation, targeted + full regression results and unresolved risks

## Execution order

0. Finish branch CI for queue shutdown changes; address failures without weakening tests.
1. Produce evidence-backed feature-to-code inventory and dependency map. Mark existing/partial/missing.
2. Close critical integrity, security and lifecycle defects in the current architecture.
3. Add measurable performance baselines and broaden existing fuzz and fault-injection harnesses.
4. Extend existing audio QA, script/voice management and incremental generation capabilities.
5. Implement integrated production orchestration and UX only after foundational contracts are stable.
6. Validate release artifacts and real-world audio/hardware behavior before production claims.

## Definition of done

For each change: documented pre-existing implementation and reuse decision; acceptance criteria; root cause if fixing defect; targeted executable regression; multiple novel fuzz/fault-injection cases; relevant integration and full CI results; security/performance impact; updated documentation; remaining risks. Never conflate CI success with full target-hardware validation.
