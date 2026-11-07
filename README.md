# BetterVoiceStudio

**A community-minded, independent fork of [VoiceStudio](https://github.com/debpalash/VoiceStudio), built to improve reliability, performance, accessibility, audio quality and production workflows.**

[Source](https://github.com/DevTunaSoft/BetterVoiceStudio) · [Development CI](https://github.com/DevTunaSoft/BetterVoiceStudio/actions) · [Fork releases](https://github.com/DevTunaSoft/BetterVoiceStudio/releases) · [Documentation](docs/README.md) · [Feature catalog](docs/feature-catalog.md) · [Roadmap](docs/roadmap/CONSOLIDATED_CAPABILITY_PROGRAM.md) · [Credits and licensing](docs/FORK_AND_ATTRIBUTION.md)

> **Independent fork — no upstream affiliation.** BetterVoiceStudio is developed from the open-source [VoiceStudio](https://github.com/debpalash/VoiceStudio) codebase and its incorporated projects. We value sharing, retaining original copyright and license notices, and crediting upstream authors. The original VoiceStudio website, installers, subscriptions, cloud services, sponsorships, and community channels are **not BetterVoiceStudio offerings** and are intentionally not promoted here.

> **Development status.** This fork is under active modernization. The roadmap is a direction, **not a list of shipped features**. Much of the existing application still uses the original VoiceStudio name and identifiers for compatibility. Check [fork releases](https://github.com/DevTunaSoft/BetterVoiceStudio/releases) for any published BetterVoiceStudio artifacts; **do not install an upstream release expecting fork changes**.

## What BetterVoiceStudio is

A local-first AI speech and voice-production application built upon the substantial existing VoiceStudio foundation. The inherited codebase includes voice cloning and design, transcription, dubbing, narration and audiobooks, model management, queued jobs, and automation. Actual capabilities depend on installed engines, hardware, platform, model licenses and configuration.

The fork's mission is to strengthen and extend those workflows without replacing working implementations merely for the sake of rewriting them.

## Our direction

| Focus | What we're working toward |
| --- | --- |
| **Reliable generation** | Crash-safe jobs, checkpointing, predictable cancellation, safe recovery and project integrity |
| **Performance** | Measured startup and inference improvements, intelligent CPU/GPU memory management and model loading |
| **Audio quality** | Quality inspection, pronunciation tools, speech-to-script verification and selective regeneration |
| **Professional production** | Better audiobook, dubbing, editing, voice-directing and export workflows |
| **Automation** | Integrated production pipelines, reusable recipes, actionable diagnostics and accessible controls |
| **Trust and openness** | Consent-aware voice use, local-first processing, clear licensing, upstream credit and reproducible builds |
| **Engineering quality** | Fuzzing, fault injection, cross-platform regression tests, real-audio verification and honest release gates |

**Planned does not mean implemented.** See the [consolidated capability program](docs/roadmap/CONSOLIDATED_CAPABILITY_PROGRAM.md) for the complete backlog and verification standards.

## Development progress

- Established a modernization roadmap, baseline audit and non-duplication policy.
- Added initial Electron IPC caller-authorization checks and regression contracts.
- Committed a queue shutdown/restart correction and accompanying regression tests.
- A prior baseline GitHub Actions run [passed its scheduled jobs](https://github.com/DevTunaSoft/BetterVoiceStudio/actions/runs/42343938623). This run predates later commits; check the [current workflow results](https://github.com/DevTunaSoft/BetterVoiceStudio/actions) for their verification.
- Full production qualification, representative GPU inference, audio quality and every target OS/hardware combination remain **unverified** unless separately documented.

## Existing functionality and technical guides

These describe the **inherited application** and are maintained as the fork evolves. Some internal screenshots, commands and platform guides may still refer to VoiceStudio. A guide's existence is not proof that a BetterVoiceStudio-branded release has shipped.

| Area | Documentation |
| --- | --- |
| Voice design and cloning | [Voice design](docs/voice-design.md) · [Audio quality](docs/audio-quality.md) |
| Transcription and dictation | [Transcriptions](docs/electron-transcriptions.md) · [Dictation](docs/features/dictation.md) |
| Video dubbing | [Dubbing](docs/electron-dubbing.md) · [Multi-speaker guide](docs/dubbing/multi-speaker-guide.md) |
| Audiobooks and projects | [Long-form narration](docs/electron-longform.md) · [Projects](docs/electron-projects.md) |
| Models and engines | [Engine guides](docs/engines/README.md) · [Model downloads](docs/downloading-models.md) |
| Automation | [Local API](docs/speech-platform.md) · [MCP](docs/mcp.md) |
| Developer reference | [Architecture](docs/STRUCTURE.md) · [Development documentation](docs/README.md) |

## Build and test from source

This repository currently retains upstream build identifiers and development tooling. These commands are **developer workflows**, not a claim that an independently packaged BetterVoiceStudio installer is available.

**Prerequisites:** Follow the relevant [development and platform documentation](docs/README.md); the monorepo declares Bun 1.4.2 and Python 3.11+.

```sh
git clone https://github.com/DevTunaSoft/BetterVoiceStudio.git
cd BetterVoiceStudio
bun install
bun run typecheck
bun run lint
bun run test
bun run build
```

For Python tests, use the repository's existing `uv` environment and test instructions. See [CI](.github/workflows/ci.yml) for the full cross-platform verification matrix. Not all native, GPU or installer tests can run on every development machine.

## No duplicate implementations

Before adding features, we search the entire repository for existing code, APIs, data structures, tests and documentation. We then **reuse and improve the authoritative implementation** wherever possible. The repository already contains job queues, model management, audio-quality tools, voice profiles, project bundles and performance services; their completeness is being audited.

Every substantive change should include a reproducible test, regression verification, multiple distinct fault/fuzz scenarios where appropriate, and a record of remaining risks. We do not claim an application is error-free or production-ready without supporting evidence.

## Historical upstream translations

The inherited VoiceStudio translations in [docs/readme/](docs/readme/) remain available for historical reference and attribution. **They describe the original upstream application, not the current BetterVoiceStudio fork**, and may contain upstream installation, sponsorship, commercial or community links. Do not interpret them as translated BetterVoiceStudio documentation. Their original English reference is pinned in `tests/fixtures/legacy_upstream_readme.md` for regression checking until fork-specific translations are authored and verified.

## Open source, credits and licensing

**BetterVoiceStudio stands on the work of others.** The primary upstream is [VoiceStudio by Palash Debnath and contributors](https://github.com/debpalash/VoiceStudio). The inherited repository also includes the [OmniVoice](https://github.com/k2-fsa/OmniVoice) ecosystem and components adapted from other open-source projects. See [fork attribution and third-party credits](docs/FORK_AND_ATTRIBUTION.md), [LICENSE-NOTICE.md](LICENSE-NOTICE.md), [model credits](docs/model-credits.md), and the original copyright and license notices in the source tree.

The application declares **AGPL-3.0-only** for its main codebase; certain incorporated components, model weights, tokenizers, datasets and media assets have **different licenses**. In particular, some model weights have non-commercial restrictions. The application license alone does not grant rights to use every model or voice commercially. Read the applicable terms before use or redistribution.

We retain upstream Git history and attribution rather than taking credit for inherited work. If you find missing credit, please [open an issue](https://github.com/DevTunaSoft/BetterVoiceStudio/issues).

## Contributing and reporting issues

We welcome fixes, tests, documentation, accessibility improvements, and new ideas that build on existing work.

- [Report a bug or propose an enhancement](https://github.com/DevTunaSoft/BetterVoiceStudio/issues)
- [Review development changes](https://github.com/DevTunaSoft/BetterVoiceStudio/pulls)
- [Contribution review standards](.github/pull_request_template.md)
- [Development roadmap](docs/roadmap/MODERNIZATION_PROGRAM.md)

For vulnerabilities, use this repository's [security reporting page](https://github.com/DevTunaSoft/BetterVoiceStudio/security/advisories) where available; avoid publicly disclosing exploitable details.

---

*Thanks to the original VoiceStudio maintainers, OmniVoice authors, upstream contributors, and the broader open-source community. BetterVoiceStudio exists because open-source projects can be studied, shared, improved and credited.*
