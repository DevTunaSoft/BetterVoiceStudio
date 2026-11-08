"""All 22 supported locale catalogs retain disabled GitHub Issues messages."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
LOCALES = ROOT / "electron" / "src" / "renderer" / "src" / "i18n" / "locales"


def test_disabled_issue_messages_exist_in_all_locales():
    locales = sorted(LOCALES.glob("*.json"))
    assert len(locales) == 22
    for file in locales:
        report = json.loads(file.read_text(encoding="utf-8"))["reportBug"]
        for key in ("issues_disabled", "save_diagnostics_failed_local"):
            value = report.get(key)
            assert isinstance(value, str) and len(value) >= 35, (file.name, key)
        assert "GitHub" in report["issues_disabled"], file.name
        assert "BetterVoiceStudio" in report["issues_disabled"], file.name
