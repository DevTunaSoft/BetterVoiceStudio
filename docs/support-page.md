# VoiceBlueprint Pro support and identity

**Implemented in draft PR #3, not yet accepted as a production release.**

The desktop Support and Project pages now identify VoiceBlueprint Pro as an independent open-source product developed by DevTunaSoft contributors. The canonical destination is [DevTunaSoft/VoiceBlueprint-Pro](https://github.com/DevTunaSoft/VoiceBlueprint-Pro).

The inherited VoiceStudio payment providers, sponsor roster, Discord, personal email, commercial checkout, and social accounts are **not** official VoiceBlueprint Pro channels. The new desktop support UI no longer offers those destinations. The legacy Support route remains for navigation compatibility but now displays Project, Licensing and Contact information.

The Pro route explains that no paid VoiceBlueprint Pro subscription, checkout, or commercial licence is currently offered. It does not imply that the original project's paid plans belong to this fork. Model and component licences remain applicable.

Android and iOS support pages similarly replace the inherited donation and sponsor catalog with independent project information. Mobile navigation route IDs are retained for compatibility until a separately tested migration.

**Remaining verification:** run desktop and mobile tests, inspect CI results, validate visible labels and external links on actual Windows/Android/iOS devices, and audit remaining upstream-specific documentation and integration endpoints. Do not label these screens production-accepted before that evidence exists.
