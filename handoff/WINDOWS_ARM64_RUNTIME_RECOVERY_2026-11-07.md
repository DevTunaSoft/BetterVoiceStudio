# BetterVoiceStudio: Windows ARM64 runtime recovery (2026-11-07)

## Scope and release boundary

Branch: `engineering/modernization-foundation` (draft PR #1 into `main`). This is development work; do not merge or advertise a production-ready Windows ARM64 installer before complete green CI and real Windows ARM64 hardware validation. Packaging is artifact-only (`--publish never`).

## Verified incident evidence (pre-fix)

- Packaging run [42414196153](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42414196153) completed on 2026-11-07. Windows x64, Linux x64, macOS ARM64 and macOS Intel package jobs succeeded; Windows ARM64 package job failed. The workflow's overall conclusion was `success` because the ARM64 matrix leg is `continue-on-error` / experimental, so always inspect individual matrix jobs.
- Windows ARM64 failed in `electron/tests/packaged-smoke.mjs --setup`, before the `--install` step. The startup status was `stage=failed`, with `Windows ROCm requires Windows x64 Python 3.12 (cp312).`
- Earlier run [42399654935](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42399654935) failed both Windows legs; Windows x64 attempted AMD ROCm on a hosted runner without compatible AMD GPU. CI's explicit CPU override fixed Windows x64 in subsequent packaging.
- Packaging workflow originally applied `OMNIVOICE_TORCH_VARIANT=cpu` only to the **installation** step; ARM64 already failed during the earlier **setup** step.

## Implementation committed

- `electron/src/main/runtime-windows-rocm.ts`: `windowsRocmSelected()` now returns false rather than throwing on Windows ARM64. AMD ROCm is selected only for Windows x64 with an explicit `rocm` choice.
- `electron/src/main/runtime-project.ts`: `resolveTorchVariant()` maps an unsupported explicit/stale Windows ARM64 `rocm` choice to `{variant:'cpu', explicit:true}`; `rocmTorchApplies()` rejects ROCm on Windows architectures other than x64. `managedPythonRequest()` retains `cpython-3.11-windows-x86_64` on Windows ARM64 (emulated x64 Python and CPU torch).
- `.github/workflows/electron-build.yml`: force CPU torch and assert it before **both** `--setup` and `--install` packaging smoke tests on hosted Windows runners. No user production default is modified.
- `electron/src/main/runtime-windows-rocm.test.ts`: checks ARM64 explicit ROCm resolves to CPU without an exception; Windows x64 ROCm stays supported.
- `electron/src/main/runtime-windows-rocm-optin.test.ts`: checks non-throwing ARM64 ROCm detection, CPU torch choice, ARM64 managed Python selection, non-AMD downloads and readiness checks.
- `electron/src/main/runtime-torch-variant.test.ts`: installs with a deliberately stale `rocm` setting on simulated Windows ARM64 and verifies x64 Python 3.11, CPU PyTorch and no AMD overlay command.
- `electron/src/main/torch-choice.test.ts`: verifies Windows ARM64 does not persist a new unsupported ROCm choice.

The last code commit at preparation time is [8c5050acc2ef72f607439b629f3c649d316e3450](https://github.com/DevTunaSoft/BetterVoiceStudio/commit/8c5050acc2ef72f607439b629f3c649d316e3450).

## Verification ledger

- **Previously verified:** Windows x64 package, installer contract, first-start and runtime installation acceptance all passed in packaging run 42414196153. Artifact `electron-rehearsal-win32-x64` exists (about 232 MB). Other non-ARM64 matrix legs passed in that run.
- **Pending on new code:** `CI` (Electron, Python, renderer and other automated suites), and packaging run [42418067321](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42418067321) on commit 8c5050ac. Confirm job-level status; experimental ARM64 failures may not fail the workflow as a whole.
- **Never claimed complete:** real Windows x64 / Windows ARM64 GUI, device/audio/GPU and installer acceptance on user hardware.
- **No local full checkout/build:** GitHub access in this execution used the GitHub connector; the local container could not clone from github.com. GitHub Actions is the executable verification environment for this handoff.

## Precise continuation checklist

1. Open the new packaging run and inspect every `package (...)` matrix job, especially `windows-11-arm`. Confirm the `Packaged startup smoke test` passes, then the `Install and start a fresh packaged runtime` step passes.
2. If ARM64 fails again, download/read **its job logs**, locate the first failing step and exact `##[error]`. Trace any CPU torch selection leak or Python x64 subprocess issue. Fix root cause, add targeted tests, and rerun full CI and packaging.
3. Confirm `electron-rehearsal-win32-arm64` and `electron-rehearsal-win32-x64` artifacts exist. Validate their sizes, package contracts, smoke tests, and updater metadata.
4. Check the latest `CI`, `Handoff validation`, `CLA` and `commit-identity` checks for current code; do not treat cancelled runs as passing.
5. When automated checks are green, install/test on genuine Windows hardware: first-run UI, CPU runtime setup, model-free backend startup, voice playback/capture, permissions, clean shutdown, restart, repair, update, crash recovery, and application logs. Keep release blocked until these steps are verified.
6. Maintain development branch, draft PR, and this handoff. Do not publish or merge automatically based only on experimental CI green.

## Recovery and links

- Repo: https://github.com/DevTunaSoft/BetterVoiceStudio
- Draft PR: https://github.com/DevTunaSoft/BetterVoiceStudio/pull/1
- Packaging workflow: https://github.com/DevTunaSoft/BetterVoiceStudio/actions/workflows/electron-build.yml
- Main handoff: `handoff/MASTER_HANDOFF.md`
- No manual dispatch tool is available through this GitHub connector. Relevant push changes on `engineering/modernization-foundation` automatically start artifact-only packaging.
