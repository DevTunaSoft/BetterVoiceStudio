# Troubleshooting and recovery

**Status:** General safety guidance; specific buttons, logs and recovery paths require verification.

## When something goes wrong

1. Preserve original audio, projects and model files. Avoid deleting folders to force a reset.
2. Record what you were doing, the exact error text, the app version and your operating system.
3. Note whether the failure occurred during installation, model download, generation, playback, saving or export.
4. If safe, retry once with a small non-sensitive test project; do not repeat destructive actions.
5. Report reproducible non-sensitive defects through [BetterVoiceStudio issues](https://github.com/DevTunaSoft/BetterVoiceStudio/issues). Report vulnerabilities privately using the repository security policy.

## Known development limitations

- Current modernization CI has experienced Electron typecheck and desktop UI failures; these are not evidence of a releasable build.
- Platform-specific installer and upgrade behavior is not verified.
- Model recovery, backup and restore steps are not yet acceptance-tested.

This chapter will gain error-specific diagnoses, safe repair steps and verified logs as issues are resolved.
