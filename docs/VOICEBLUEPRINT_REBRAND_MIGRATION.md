# VoiceBlueprint Pro — internal rebrand migration

**Target identity:** VoiceBlueprint Pro — **Design. Clone. Create.**  
**Repository:** `DevTunaSoft/VoiceBlueprint-Pro`  
**Status:** phased, not production accepted. Historical attribution and upstream engine identifiers must remain accurate.

## Implemented in the first phase

- `config/app.json` productName changed to VoiceBlueprint Pro, which flows to Electron builder productName and installer artifact prefix.
- Settings → About now displays VoiceBlueprint Pro.
- The Electron package description, repository homepage, and in-app bug-report repository URL point to the new project.
- Direct Electron generic update provider URL points to this project's GitHub releases.
- README and brand documentation updated; About repository-link regression assertion updated.

## Mandatory remaining work

- **Windows:** build installer and EXE on x64 and ARM64; inspect actual filenames, Windows taskbar/window title, executable metadata, install/uninstall registration, shortcuts, signing, and upgrade/rollback from the old brand. No verified Windows runtime test yet.
- **Icons:** design and approve a new canonical SVG; regenerate ICO, ICNS, PNG, taskbar/tray, splash, browser favicon, installer art, mobile assets and store imagery. Do not relabel old artwork as newly branded.
- **UI:** audit first-run setup, splash, title bar, error/recovery screens, translation dictionaries, support links, diagnostics, notifications, and About actions.
- **Release systems:** audit `electron-release.yml`, `electron-build.yml`, `scripts/prepare_electron_release.py`, artifact-name parsers, signing metadata, update manifests, beta/stable channel routing, and rollback compatibility. A new GitHub URL is **not** proof an update feed exists.
- **Other platforms:** inspect Tauri Rust bundle identity, macOS signing/notarization, Linux packages, Android application IDs, iOS bundle IDs, store identities, CI matrices and publishing credentials.
- **Documentation:** systematically audit guides, screenshots, install commands, README links, workflow badges, test fixtures and legacy URLs.
- **Regression:** ensure old installations retain data and migrate safely; add tests for artifact naming, update metadata, old-to-new user-data path migration, uninstall behavior and release assets. Run complete test and packaging suite before release.

## Compatibility decisions

Do **not** rename `com.voicestudio.desktop` yet. This existing app ID may govern OS identity, update behavior and user data paths. Do not silently rename `OMNIVOICE_*` environment variables, engine names, package import paths, stored preferences, local directories, API headers, Docker identifiers, or model IDs without a versioned migration and rollback. Keep original author/license attribution and links identifying the upstream project.

The direct update endpoint now targets this fork. Until matching signed assets and manifests are published and tested, update availability is **unverified**. Do not publish an installer that could lose its upgrade path.

## Release acceptance gate

1. Verify old and new installation side-by-side and upgrade-in-place behavior, including data persistence.
2. Verify a signed Windows installer starts on real Windows, creates correct shortcuts, reports correct About metadata, and uninstalls without deleting user data.
3. Verify the updater checks the intended channel and can install a properly signed update; verify rollback on failure.
4. Verify a clean build and full regression suite; record build SHA, environment, test counts and observed results.
5. Verify every newly generated visual asset is present and licenses/credits remain intact.

No task above is marked complete without direct evidence.

## Engineering verification — November 8, 2026

- The canonical `docs/logo.svg` and `electron/public/favicon.svg` now use the blue B-shaped waveform/blueprint design. The in-app React mark and macOS tray vectors have corresponding geometry.
- [Asset generation run #42502149756](https://github.com/DevTunaSoft/VoiceBlueprint-Pro/actions/runs/42502149756) **passed** on macOS; it generated and committed ICO, ICNS, PNG, tray art and localized visible brand strings. The job reported **37 passed** branding/packaging tests. Its earlier attempt #42502098135 failed only at staging gitignored binary icons; the follow-up corrected that defect.
- Offline Linux local checkout (restored from the verified November 8 Git bundle, with rebrand changes applied) passed **85 Python tests** for branding/release contracts and **28 Node shell-installer safety tests**. The local environment did not have PowerShell or Bun dependencies, so these do **not** establish Windows installation or full Electron test acceptance.
- The Electron artifact-only [packaging rehearsal](https://github.com/DevTunaSoft/VoiceBlueprint-Pro/actions/workflows/electron-build.yml) now has a scoped push trigger for this branch. Its Windows x64/ARM64, macOS and Linux outcomes must be inspected before merging.
- PR [#3](https://github.com/DevTunaSoft/VoiceBlueprint-Pro/pull/3) remains draft. No signed release, real-Windows upgrade test or auto-update round trip has been verified.
- The installer scripts now use this fork's release URLs and the `VoiceBlueprint-Pro-<version>` artifact prefix. Source builds point to this fork. Historical data paths and `VOICESTUDIO_*` environment variables are intentionally preserved.
- Android/iOS display labels were updated without changing package/bundle identifiers. Actual mobile builds and store ownership must be validated separately.

## Known blockers and migration cautions

1. **Repository settings:** GitHub repository description and homepage still refer to BetterVoiceStudio; the available GitHub connection cannot edit repository administration settings. Update them in GitHub Settings → General. GitHub Issues and Discussions are disabled, so the inherited bug-report/contact links cannot be treated as functional until an owned reporting channel is enabled.
2. **Store ownership:** `store/metadata.json` retains the upstream publisher legal name and Apple App Store ID. These cannot be represented as owned by this fork. No store submission until independent registrations and signing identities are configured and tested.
3. **Legacy identity:** `com.voicestudio.desktop`, Python package names, `OMNIVOICE_*` and `VOICESTUDIO_*` environment variables, engine IDs, persisted data directories, local API header names and old model references remain by design. Rename only after migration/rollback tests.
4. **Upstream services:** inherited commercial-license, donation, cloud account, Discord, social and sponsor links must not be presented as official VoiceBlueprint Pro services. Audit or remove these flows before release.
5. **Update safety:** the fork has no published compatible signed update feed. A new update URL alone does not establish a working updater. Do not ship without manifest, signature, rollback and upgrade-in-place verification.
6. **Release test:** GitHub Actions package rehearsal is not a substitute for testing a real Windows x64 installation, data migration, uninstall, crash recovery, and actual voice generation.

## Next continuation point

Inspect the latest PR #3 CI, Install smoke and Electron packaging rehearsal jobs; fix failures at their root cause. Then audit inherited first-party UI links, finish mobile/release artifact consistency, verify Windows EXE metadata and update manifest names, and run real-Windows installation/upgrade acceptance. Preserve original upstream authorship, licenses and engine lineage.
