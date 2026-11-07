# Baseline source audit — pass 1

Date: 2026-11-06
Scope: Directly inspected files on `main` using connected GitHub file reads. No local clone, build, test run, or hardware benchmark was possible in this pass. **Do not interpret documented behavior as independently verified runtime behavior.**

## Branch inventory

GitHub branch search with pagination returned `main` and `engineering/modernization-foundation`. The second page was empty.

## Source observations and evidence

| Evidence | Observation | Follow-up |
|---|---|---|
| `package.json` | Root package version 0.5.7, Bun 1.4.2, AGPL-3.0-only, build/test/typecheck scripts | Run reproducible baseline |
| `electron/package.json` | Electron, React, TypeScript, Vite, Vitest, packaging scripts, homepage points to upstream | Validate actual fork release/metadata |
| `config/app.json` | Product name remains `VoiceStudio`; app ID `com.voicestudio.desktop` | Define migration-safe identity strategy before rebranding |
| `electron/src/main/index.ts` | Context isolation enabled, Node integration disabled, renderer sandbox disabled for ESM preload; explicit persistence flush and backend shutdown timeouts | Review preload exposure, sender authorization, failure and shutdown races |
| `electron/src/preload/index.ts` | Explicit bridge exposing browser, repair, update, watch, account, backend and maintenance methods | Trace every IPC handler and validate arguments/authorization |
| `electron/src/main/trusted-renderer.ts` | Renderer trust helper compares protocol, hostname, port, and disallows credentials | Review dev URL construction, path rules and call-site enforcement |
| `docs/audio-quality.md` | Documents local audio checks, sample precision, seed forwarding, bounded scans, and model-free tests | Verify implementation/tests rather than reimplement |
| `docs/electron-dubbing.md` | Documents segment editing, virtualization, speaker-aware workflows, issue navigation, atomic previews and recovery concepts | Trace real code and test coverage |
| `.github/workflows/ci.yml` | Extensive conditional CI matrix and installer/test jobs | Inspect current runs and test evidence |

## Important correction to the feature plan

The existing documentation describes several features previously proposed as new: local signal checks, editable dubbing segments, cached waveform computation, atomic preview writes, and recovery concepts. **Do not implement duplicates.** First determine what already exists, where coverage is incomplete, and what users actually need.

## Candidate risks, not confirmed defects

1. Electron renderer uses `sandbox: false`; this may be required by the current preload strategy but warrants a trust-boundary review.
2. The preload bridge has a broad IPC surface; every exposed handler requires input validation and sender authorization.
3. Shutdown races are possible in any system using asynchronous persistence flush and bounded shutdown; fault-injection tests are needed.
4. Changing product name or app ID without a migration strategy could break installed updates, local storage paths or user data.
5. Fork README, homepage and release links still point to upstream; user-facing distribution identity needs deliberate handling, with original attribution preserved.

## Required verification

- Full file and dependency inventory; inspect lockfiles, backend entry points, persistence and queue implementations.
- Establish exact baseline commit SHA.
- Run clean dependency install, lint, typecheck, unit/integration suites, packaging contract, UI smoke and native packaging on target OS.
- Test crash during save, crash during export, disk full, cancellation, missing model, corrupt project, backend restart and interrupted update.
- Benchmark representative CPU and GPU devices with real models and fixed prompts.
- Compare upstream changes and model/third-party license constraints.

## Status

- Source inspection: **partial, verified by GitHub file reads**.
- Branch search: **complete for the returned pagination**.
- Build and executable tests: **not run**.
- Security vulnerabilities: **none confirmed by this limited inspection**.
- Production readiness: **not established**.

## Next coding milestone

Select one reproducible issue from queue persistence, crash recovery or IPC authorization after fetching its actual implementation and tests. Add a failing regression test first, implement the minimal correction, run the affected tests and the full regression suite, and record evidence.
