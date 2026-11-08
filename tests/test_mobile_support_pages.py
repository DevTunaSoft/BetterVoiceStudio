"""Independent fork support catalog must never inherit upstream monetization."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTRACT = ROOT / "mobile/contract"


def test_support_catalog_contains_no_upstream_payments_or_sponsors():
    data = json.loads((CONTRACT / "support.json").read_text(encoding="utf-8"))
    assert data == {"donations": [], "projects": []}
    for path in (
        ROOT / "mobile/android/features/src/main/kotlin/com/voicestudio/mobile/features/settings/SupportScreens.kt",
        ROOT / "mobile/ios/VoiceStudio/Features/SupportPages.swift",
    ):
        source = path.read_text(encoding="utf-8")
        assert "https://github.com/DevTunaSoft/VoiceBlueprint-Pro" in source
        for forbidden in ("paypal.me/palashCoder", "ko-fi.com/debpalash", "github.com/debpalash/VoiceStudio", "discord.gg/bzQavDfVV9"):
            assert forbidden not in source, (path, forbidden)


def test_ios_resources_bundle_identical_empty_support_catalog(tmp_path):
    import runpy
    prepare = runpy.run_path(str(ROOT / "mobile/ios/scripts/prepare_resources.py"))
    output = tmp_path / "bundle"
    prepare["prepare"](output, tmp_path / "Info.plist")
    assert (output / "Catalogs/support.json").read_bytes() == (CONTRACT / "support.json").read_bytes()
