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
