# User-facing feature verification ledger

This ledger prevents documentation from claiming a workflow is ready before evidence exists.

| Area | Documented | Functional verification | Required evidence |
| --- | --- | --- | --- |
| Installation / first launch | Preliminary | Unverified | OS-specific install and launch logs/screenshots |
| Model management | Preliminary | Unverified | Real model selection/download/load tests |
| Authorized voice cloning | Preliminary | Unverified | Consent-safe end-to-end audio test |
| Speech generation | Preliminary | Unverified | Generated output, logs and quality review |
| Project save/reopen | Preliminary | Unverified | Persistence/recovery test |
| Editing / export | Preliminary | Unverified | Output format and playback test |
| Settings / support | Preliminary | CI failures under investigation | Desktop UI and route acceptance tests |
| Upgrade / rollback | Preliminary | Unverified | OS-specific migration and rollback test |

When adding evidence, record commit SHA, test environment, test name, artifact/log link, pass/fail, limitations, and last reviewed date. Do not mark any entry verified from compilation alone.
