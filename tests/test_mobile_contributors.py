"""Independent fork ownership is shown; inherited credits remain in legal history."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def test_native_home_identifies_devtunasoft_not_upstream_core_team():
    for path in (
        "mobile/android/features/src/main/kotlin/com/voicestudio/mobile/features/HomeContributors.kt",
        "mobile/ios/VoiceStudio/Features/HomeContributors.swift",
        "electron/src/renderer/src/features/home/home-contributors.tsx",
    ):
        content = (ROOT / path).read_text(encoding="utf-8")
        assert "DevTunaSoft" in content
        assert "https://github.com/debpalash/VoiceStudio" not in content
        assert "https://palash.dev" not in content


def test_historical_credits_are_not_deleted():
    # Preserve original author attribution as historical/legal context, not
    # as the current application's maintainer or support channel.
    credits = (ROOT / "LICENSE-NOTICE.md").read_text(encoding="utf-8")
    assert credits.strip()
    catalog = json.loads((ROOT / "mobile/contract/maintainer-cards.json").read_text())
    assert isinstance(catalog, dict)
