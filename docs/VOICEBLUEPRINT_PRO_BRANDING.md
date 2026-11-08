# VoiceBlueprint Pro — Brand and Repository Rename Specification

Status: **Approved working identity; GitHub repository rename and software rebrand not yet performed.**
Decision date: 2026-11-07.

## Approved naming

- User-facing product: **VoiceBlueprint Pro**
- GitHub repository slug: `VoiceBlueprint-Pro`
- Intended repository: `DevTunaSoft/VoiceBlueprint-Pro`
- Tagline: **Design. Clone. Create.**
- Publisher: **DevTunaSoft**
- Category: Local-first professional AI voice and audio production software

## Short description

VoiceBlueprint Pro is a local-first, professional AI voice and audio-production application for voice design, authorized voice cloning, speech generation, transcription, dubbing, long-form narration, and associated creative workflows. Features, performance, and availability depend on models, configuration, platform, and validated build status.

## Identity principles

- Independent flagship product; do **not** present it as an add-on or dependency of ForgeOS.
- Brand name: `VoiceBlueprint Pro` in display copy; `VoiceBlueprint-Pro` in repository URLs.
- Use the exact tagline `Design. Clone. Create.` with the periods and capitalization shown.
- Do not imply features are complete or a stable installer exists unless verified.
- Preserve attribution, original copyright notices, license obligations, and traceable upstream history. Detaching a fork or renaming does **not** erase legal obligations.
- Before public launch, conduct trademark, product-name, domain, and app-store conflict reviews. Names are not yet legally cleared.

## Required GitHub owner actions

The connected automation does not currently expose GitHub's repository settings operations for leaving a fork network or renaming the repository.

1. Make a restorable backup, including all branches, tags, and important PR/issue discussions.
2. If desired, use repository **Settings > General > Danger Zone > Leave fork network**. Confirm that the repository meets GitHub's fork detachment criteria and review metadata losses first.
3. Use repository **Settings > General > Repository name** to rename `BetterVoiceStudio` to `VoiceBlueprint-Pro`.
4. Verify the new URL, default branch, branch protections, collaborators, repository metadata, remote remotes, and GitHub Actions links.

Do not delete or recreate the original repository merely to rename it.

## Engineering rebrand checklist

- [ ] Validate backup, history, all branches/tags, and important issue/PR details
- [ ] GitHub fork detachment (only if desired and eligible)
- [ ] GitHub repository rename to `VoiceBlueprint-Pro`
- [ ] Update repository About description, topics, website, and social preview
- [ ] Update main README header, tagline, badge URLs, release links, roadmap, and user guide
- [ ] Update desktop window titles, About screen, icons, installer and binary display names
- [ ] Audit build metadata, application identifiers, package IDs, update feeds, artifacts, OS shortcuts, file associations, and signature/trust implications
- [ ] Preserve existing user settings, installed models, caches, saved projects, migrations, and upgrade compatibility
- [ ] Audit all workflows, scripts, documentation, internal links, support instructions, and external automation for old-path references
- [ ] Retain third-party attributions, license texts and upstream historical notices
- [ ] Run builds, tests, packaging and actual installer/update migration acceptance before claiming a completed rebrand
- [ ] Verify no release page or installer is marketed as stable until production acceptance is documented

## Baseline at naming decision

Current GitHub repository: `DevTunaSoft/BetterVoiceStudio`. Default branch: `main`. Modernization work is also tracked on `engineering/modernization-foundation`. Naming this product does not establish a successful repository rename, executable rebrand, or production release.
