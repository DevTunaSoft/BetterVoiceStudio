"""VoiceBlueprint Pro product identity, release and compatibility guardrails."""
import json
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
FORK = "DevTunaSoft/VoiceBlueprint-Pro"
UPSTREAM = "debpalash/VoiceStudio"


def content(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_product_identity_and_legacy_data_compatibility():
    config = json.loads(content("config/app.json"))
    assert config["productName"] == "VoiceBlueprint Pro"
    # Do not migrate existing installations by renaming the app ID blindly.
    assert config["appId"] == "com.voicestudio.desktop"
    assert "PRODUCT_NAME" in content("electron/electron-builder.config.mjs")
    assert "APP_ID" in content("electron/electron-builder.config.mjs")


def test_desktop_release_links_are_fork_owned():
    for path in (
        "electron/src/main/updater.ts",
        "electron/src/shared/utils/bugReport.js",
        "electron/electron-builder.config.mjs",
        "scripts/install.sh",
        "scripts/install.ps1",
        "electron/scripts/embed-appimage-update.mjs",
    ):
        source = content(path)
        assert FORK in source, path
        assert f"https://github.com/{UPSTREAM}/releases" not in source, path
    assert "VoiceBlueprint-Pro-${version}-linux-x64.AppImage" in content(
        "electron/scripts/embed-appimage-update.mjs"
    )
    assert 'return f"VoiceBlueprint-Pro-{version}-' in content(
        "scripts/check_electron_release_assets.py"
    )


def test_brand_svg_and_app_screens_are_consistent():
    for path in ("docs/logo.svg", "electron/public/favicon.svg"):
        logo = ET.fromstring(content(path))
        assert logo.attrib.get("viewBox") == "0 0 64 64"
        assert "VoiceBlueprint Pro" in content(path)
        assert "M18 16V48" in content(path)
    assert "VoiceBlueprint Pro" in content("electron/src/shared/components/settings/AboutTab.jsx")
    assert "VoiceBlueprint Pro" in content("README.md")
    assert "Design. Clone. Create." in content("README.md")
    assert "https://github.com/debpalash/VoiceStudio" in content("README.md"), "Keep upstream attribution"


def test_display_locale_names_have_migrated():
    for path in (
        "electron/src/shared/i18n/locales/en.json",
        "electron/src/renderer/src/i18n/locales/en.json",
    ):
        source = content(path)
        assert "VoiceBlueprint Pro" in source
        assert "VoiceStudio" not in source, path
        json.loads(source)


def test_installer_contracts_are_consistent():
    assert "ASSET_PREFIX=VoiceBlueprint-Pro" in content("scripts/install.sh")
    assert "$prefix = 'VoiceBlueprint-Pro'" in content("scripts/install.ps1")
    for path in (".github/workflows/electron-build.yml", ".github/workflows/electron-release.yml"):
        assert "release/VoiceBlueprint-Pro-" in content(path)
    assert "VoiceBlueprint-Pro-" in content("scripts/create_store_artifact_manifest.mjs")
