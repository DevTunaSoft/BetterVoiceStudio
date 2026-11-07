# Fork-only public surfaces — repository-wide audit register

**Status: IN PROGRESS.** This document distinguishes changes made from surfaces that still require code/test/compatibility review. Do not claim a full cleanup or successful CI without evidence.

## Completed in modernization branch

- Root README rewritten to describe BetterVoiceStudio only, with upstream credit, roadmap and fork-owned links; upstream Pro/Cloud, donations, sponsor placements and upstream installer calls removed.
- Docs index, license notice, fork attribution, support and security policies updated to distinguish upstream from fork.
- Upstream sponsorship issue template removed; issue template contact links changed to fork.
- Pull request template changed to fork review/attribution policy.
- Shared bug-report repository URL and shared contact repository URL changed to fork.

## Outstanding surfaces — must audit before removal or rebrand

| Surface | Known files / areas | Required action | Risk |
| --- | --- | --- | --- |
| **Desktop donations and sponsor UI** | `electron/src/shared/pages/SupportPage.jsx`, `electron/src/renderer/src/features/settings/support-settings.tsx`, `electron/src/shared/utils/donateLinks.js`, `electron/src/shared/config/sponsors.js`, donation goal/components and related tests | Remove or replace upstream-only payment and sponsorship actions; retain license/credits and legitimate support/issue access. Refactor shared and renderer UIs together. | User-facing payment redirection, broken UI/tests |
| **Other contact, social and paid-license links** | `electron/src/shared/utils/contactLinks.js`, `electron/src/shared/utils/bugReport.js`, `ContactPage`, settings/About, updater and download surfaces | Ensure fork links are valid; hide unsupported email/social/license buttons instead of leaving blank or redirecting to upstream. | Broken buttons, false offers |
| **Translated README files** | `docs/readme/README_*.md` (19 files) | Replace inherited promotional hero and sponsor sections with accurate localized fork description, links and attribution; retain translation credit. | Mismatched translations and docs tests |
| **Mobile apps** | `mobile/android/**/SupportScreens.kt`, iOS support/settings screens, `mobile/contract/support.json` | Remove upstream donation/sponsor/community CTAs, preserve model credits and privacy notices; test on target devices. | Mobile compilation, contract snapshots |
| **Sponsor assets and rosters** | `SPONSORS.md`, `funding.json`, `docs/sponsors/`, `electron/src/shared/assets/sponsors/`, `tests/test_sponsors_lockstep.py` | Archive attribution in Git history and preserve necessary licenses; remove unreferenced promotional artwork only after consumers/tests are updated. | Broken imports, false sponsorship claims |
| **Packaging and update destinations** | `config/app.json`, Electron packaging, installers, `.github/workflows/*store*.yml`, updater, download links | Audit release ownership, signing, app IDs, update endpoints and existing-user migration. Never point users to upstream builds as fork releases. | Incorrect updates, data loss, signature conflicts |
| **Inherited commercial docs** | `docs/support-page.md`, `docs/playbooks/oss-sponsorship-setup.md`, `docs/STORE-PUBLISHING.md`, `docs/store/*`, `docs/RELEASING.md` | Remove unsupported fork offers; retain relevant technical/legal history and move upstream-specific instructions to clearly labeled historical references. | Misrepresentation |
| **Contributor governance and CI** | `.github/workflows/*cla*.yml`, `.github/CLA-1.0.md`, `.github/CONTRIBUTING.md`, changelog tooling | Audit CLA and inherited checks before disabling or replacing; ensure fork contributor requirements are accurate. | Inconsistent contribution rules |
| **In-app brand labels** | `electron/src/shared/components/settings/AboutTab.jsx`, mobile resources, app metadata | Change visible labels only after confirming app identity, data paths and installer migration safety. | Breaking updates/project data |

## Mandatory validation gate

1. Inventory every external URL and brand mention in user-facing source, translation files, packaging manifests and workflows; classify as **attribution**, **technical dependency**, **historical**, **promotion**, **contact**, **download/update** or **legal notice**.
2. Keep source and license attribution. Remove only unsupported promotional/commercial calls to action, and redirect fork-owned bug/support channels.
3. Update all affected code and tests in the same change. No empty or dead CTAs. Run static tests, frontend/unit tests, translated docs link tests, mobile builds where supported and the full CI matrix.
4. Confirm update channels and installers never deliver the wrong project; test existing-data migration before changing application identifiers.
5. Document exact CI evidence, remaining failures and hardware limitations.

**Known immediate follow-up:** `contactLinks.js` currently uses empty strings for unverified email/commercial-license contact destinations, while inherited UI consumers may still render those actions. These consumers must be removed/hidden and covered by tests before declaring the link cleanup complete. The fork's Discussions and private vulnerability reporting may also require repository settings to be enabled.
