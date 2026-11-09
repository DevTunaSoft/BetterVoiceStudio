"""User-facing support must not direct people to upstream accounts."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ACTIVE_SURFACES = [
    "electron/src/shared/utils/contactLinks.js",
    "electron/src/shared/utils/donateLinks.js",
    "electron/src/shared/config/sponsors.js",
    "electron/src/shared/pages/ContactPage.jsx",
    "electron/src/shared/pages/SupportPage.jsx",
    "electron/src/shared/components/LogsFooter.jsx",
    "electron/src/renderer/src/features/settings/support-settings.tsx",
    "electron/src/renderer/src/features/pro/pro-page.tsx",
    "electron/src/renderer/src/components/app-shell/github-star.tsx",
    "mobile/android/features/src/main/kotlin/com/voicestudio/mobile/features/settings/SupportScreens.kt",
    "mobile/ios/VoiceStudio/Features/SupportPages.swift",
    ".github/SUPPORT.md",
    ".github/SECURITY.md",
    ".github/ISSUE_TEMPLATE/config.yml",
    "SPONSORS.md",
]
FORBIDDEN = (
    "https://voicestudio.sh",
    "https://palash.dev",
    "https://x.com/idebpalash",
    "https://discord.gg/bzQavDfVV9",
    "https://github.com/debpalash/VoiceStudio",
    "https://github.com/sponsors/debpalash",
    "https://ko-fi.com/debpalash",
    "https://paypal.me/palashCoder",
    "hi@voicestudio.sh",
    "partner@voicestudio.sh",
    "security@voicestudio.sh",
)


def test_all_active_support_surfaces_are_fork_owned():
    for path in ACTIVE_SURFACES:
        content = (ROOT / path).read_text(encoding="utf-8")
        for old in FORBIDDEN:
            assert old not in content, (path, old)


def test_about_and_package_metadata_identify_dev_tuna_soft():
    about = (ROOT / "electron/src/shared/components/settings/AboutTab.jsx").read_text(encoding="utf-8")
    package = (ROOT / "electron/package.json").read_text(encoding="utf-8")
    assert "DevTunaSoft contributors" in about
    assert "DevTunaSoft contributors" in package
    assert "Design. Clone. Create." in about


def test_no_unverified_funding_buttons_or_checkout():
    for path in (".github/FUNDING.yml", "funding.json", ".github/ISSUE_TEMPLATE/sponsor.yml"):
        assert not (ROOT / path).exists()
    assert "export const FUNDING_ENABLED = false" in (
        ROOT / "electron/src/shared/utils/donateLinks.js"
    ).read_text(encoding="utf-8")
