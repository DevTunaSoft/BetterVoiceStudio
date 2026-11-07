# BetterVoiceStudio — User Documentation Quality Standard

**Authority:** Applies to all user-visible changes, desktop/mobile releases, troubleshooting guides, screenshots, tutorials, accessibility instructions and support material. **Status:** Standard adopted; automated enforcement is incremental, not yet complete.

## Audience and outcomes

Write for first-time users without development knowledge, experienced audio producers, and support technicians. Users must be able to complete a workflow, recognize success, diagnose common failures, recover without losing work, and know when a feature is not supported. Prefer plain language, explicit steps and descriptive labels. Define terms (model, inference, VRAM, project, reference audio) on first use.

## Mandatory content for each workflow

Each workflow must document:

1. **Workflow ID and name**, last-reviewed date, applicable app version/commit, owning feature/module and documentation owner.
2. **Evidence status:** `unverified`, `source-inspected`, `automated-test-verified`, `real-platform-verified`, or `release-verified`; link to reproducible logs/tests/screenshots. Never promote status on compilation alone.
3. **Goal and expected result** in one paragraph, including actual output type/location when known.
4. **Prerequisites:** supported OS, hardware and storage, required models, permissions, network/offline needs, licenses, user-provided media and consent.
5. **Exact navigation:** starting screen, button/menu labels, field names, keyboard alternative and screen-reader labels as actually verified. Avoid guesses.
6. **Numbered instructions** with one clear action per step, exact values where safe, decision branches and expected feedback after critical steps.
7. **Example walkthrough:** non-sensitive sample inputs, typical settings, outputs and quality checks; sample assets must be redistributable and license-documented.
8. **What can go wrong:** symptoms, likely causes, diagnostic steps, safe correction, retry/backoff and when to escalate. Distinguish recoverable vs irreversible actions.
9. **Data safety:** where originals, models, temp files, projects and exports reside; save/backup/restore, interruption, cancel, upgrade, and rollback behavior. Mark unknowns.
10. **Accessibility:** keyboard-only path, focus order, screen reader, captions/transcripts for video, contrast/zoom, non-audio cues for audio-related operations.
11. **Privacy/security:** local versus remote processing, consent, sensitive recordings, telemetry, model provenance, safe logs and sharing.
12. **Compatibility matrix:** Windows/macOS/Linux and Android/iOS where applicable; CPU/GPU, offline/online, known exceptions.
13. **Validation evidence:** exact test case, commit, environment, run link, timestamp, observed result, failure status and remaining limitations.
14. **Related material:** concepts, troubleshooting, release notes, known issues and feedback links.

## Documentation information architecture

- **Getting started:** installation, first launch, setup, first successful project, where files live.
- **Concepts:** model engines, voices, projects, generation, conversion, transcription, diarization, dubbing, rendering and licensing.
- **Task guides:** one page per tested user goal, including batch and long-running workflows.
- **Reference:** every exposed setting, format, limit, keyboard shortcut, error code and supported model/platform combination.
- **Troubleshooting:** symptom-indexed decision trees with safe recovery and escalation.
- **Data protection:** autosave, backup, restore, migrations, rollback and privacy.
- **Accessibility:** keyboard, screen readers, non-speech workflows and visual cues.
- **Release-specific changes:** new/changed/removed controls, migrations and updated screenshots.
- **FAQ/glossary:** common questions and terminology.

## Screenshot and video standards

Capture from a **running, identified build**. Include platform, app version/commit, language, theme, resolution, timestamp and associated test evidence in metadata or nearby text. Blur secrets, private recordings, account details, device identifiers and personal files. Use annotated crops for complex controls but preserve unaltered source evidence. Provide meaningful alt text; do not rely on color alone. Re-capture after UI changes. Video tutorials need accurate captions and a text equivalent. Never generate fictitious product screenshots and present them as real.

## Documentation release gates

A user-facing change is not documentation-complete until:

- Affected workflow page and settings reference are updated together with the feature.
- All new links and assets resolve locally; no upstream-only purchase/support links remain.
- Steps match the actual UI on each claimed platform, including error states.
- At least one documented happy path and one failure/recovery path are exercised in acceptance tests.
- Accessibility and privacy checks are recorded; screenshots have alt text and provenance.
- The feature ledger links the exact code commit, evidence and documentation page.
- Unsupported or unverified paths are clearly marked.
- Reviewers verify instructions independently from the document without hidden context.

**Fail closed:** If evidence is unavailable, retain `unverified` and block a `release-verified` claim. Documentation may ship as a clearly labeled draft while software release remains blocked by separate quality gates.

## Change-control workflow

For every feature/bugfix: identify impacted pages → update text and screenshots → add or update acceptance tests → verify instructions on target platforms → update ledger → run documentation checks → append handoff checkpoint. Include documentation impact in PR review. If a change is internal-only, record `no user-visible change` with justification rather than inventing a guide.

## Audit schedule

At every release candidate, audit links, screenshots, menu names, keyboard paths, translations, sample media licenses, model requirements, support destinations, backup guidance and outdated warnings. Repeat after major UI redesigns, OS changes and installer migrations. Record unresolved mismatches as release risks.

## Workflow page template

```markdown
# [Workflow ID] — [Task]
Status: unverified | source-inspected | automated-test-verified | real-platform-verified | release-verified
Last reviewed: YYYY-MM-DD
Applies to: BetterVoiceStudio [version/commit], [OS/build]
Evidence: [test/log/screenshot reference or "none yet"]

## What you will accomplish
## Before you begin
## Step-by-step instructions
## Example and expected results
## Troubleshooting and safe recovery
## Saving, backup and data safety
## Accessibility
## Privacy, consent and model licenses
## Compatibility and limitations
## Verification record
## Related guides
```

## Documentation defects to track

DOC-001: First-run, installation and model steps are not yet verified against target OS builds.  
DOC-002: No authenticated screenshots or complete screen-reader/keyboard walkthroughs yet.  
DOC-003: Existing inherited docs may contain outdated upstream controls, links and paid-service claims.  
DOC-004: Translation coverage and consistency are not audited.  
DOC-005: Documentation quality gate does not yet verify real UI behavior or evidence provenance.
