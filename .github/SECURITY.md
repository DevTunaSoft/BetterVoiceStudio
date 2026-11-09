# VoiceBlueprint Pro security policy

VoiceBlueprint Pro is independently maintained by DevTunaSoft contributors. **Do not send security reports to the original project's support email, Discord or website.**

## Supported versions

No independently signed, production-accepted VoiceBlueprint Pro release has been verified yet. Development branches and CI artifacts are **not** a security-supported production release. Supported versions and maintenance windows will be published here when releases are ready.

## Reporting a vulnerability

Do **not** open a public GitHub issue containing an exploit, private data or credentials.

Check the [VoiceBlueprint Pro Security page](https://github.com/DevTunaSoft/VoiceBlueprint-Pro/security) for private vulnerability reporting. If GitHub's **Report a vulnerability** option is available, use it. If it is not available, the maintainer must enable private vulnerability reporting in GitHub Settings → Code security and analysis before a private intake can be promised. No project-owned security mailbox has been verified.

Include the affected version/commit, reproducible steps, impact, minimal sanitized logs and a safe proof of concept. Never attach credentials, private audio, access tokens or customer information.

## Security boundaries

- Model files and archives may contain untrusted data or executables; verify sources and licences.
- Local-first does not mean every feature is network-free: model downloads, update checks and optional integrations may contact external services.
- Do not expose a local API on a public network without authentication and a correctly configured reverse proxy.
- Review bundled dependency advisories and signed release metadata before installation.
- The project does not currently promise a specific vulnerability-response SLA.

Open-source licence and attribution notices remain intact; this policy governs only the independent VoiceBlueprint Pro project.
