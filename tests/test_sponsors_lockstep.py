"""VoiceBlueprint Pro must not inherit the original project's sponsor contracts."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_no_unverified_fork_sponsors_or_payment_accounts():
    sponsors = (ROOT / "electron/src/shared/config/sponsors.js").read_text(encoding="utf-8")
    donations = (ROOT / "electron/src/shared/utils/donateLinks.js").read_text(encoding="utf-8")
    policy = (ROOT / "SPONSORS.md").read_text(encoding="utf-8")
    assert "export const SPONSORS = []" in sponsors
    assert "FUNDING_ENABLED = false" in donations
    assert "no current VoiceBlueprint Pro sponsors" in policy
    for path in ("funding.json", ".github/FUNDING.yml", ".github/ISSUE_TEMPLATE/sponsor.yml"):
        assert not (ROOT / path).exists(), path


def test_mobile_support_catalog_contains_no_inherited_sponsors():
    catalog = json.loads((ROOT / "mobile/contract/support.json").read_text(encoding="utf-8"))
    assert catalog == {"donations": [], "projects": []}
