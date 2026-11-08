"""Keep the fork user manual accurate about tested builds, privacy and support."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GUIDE = ROOT / "docs" / "user-guide"
PAGES = ("README.md", "installation.md", "models.md", "workflows.md",
         "troubleshooting.md", "feature-verification.md")


def test_fork_manual_has_no_dead_issues_or_upstream_installer_links():
    for name in PAGES:
        content = (GUIDE / name).read_text(encoding="utf-8")
        assert len(content) >= 900, name
        assert "https://github.com/DevTunaSoft/BetterVoiceStudio/issues" not in content, name
        assert "irm https://voicestudio.sh/install.ps1" not in content, name
        assert "github.com/debpalash/VoiceStudio/releases/latest" not in content, name


def test_fork_manual_evidence_and_release_boundaries():
    install = (GUIDE / "installation.md").read_text(encoding="utf-8")
    evidence = (GUIDE / "feature-verification.md").read_text(encoding="utf-8")
    issues = (GUIDE / "troubleshooting.md").read_text(encoding="utf-8")
    assert "42426554733" in install and "42426554733" in evidence
    assert "42439650200" in evidence and "42439650200" in issues
    assert "real-device" in evidence
    assert "experimental" in install.lower()
    assert "Settings" in install and "Models" in install


def test_fork_homepage_links_to_canonical_manual():
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    index = (ROOT / "docs" / "README.md").read_text(encoding="utf-8")
    assert "[Beginner manual](docs/user-guide/README.md)" in readme
    assert "(user-guide/README.md)" in index


def test_fork_manual_preserves_required_quality_validator_contract():
    guide = (GUIDE / "README.md").read_text(encoding="utf-8")
    ledger = (GUIDE / "feature-verification.md").read_text(encoding="utf-8")
    assert "## Start here" in guide
    assert "## Documentation acceptance rule" in guide
    assert "Functional verification" in ledger
    assert "Required evidence" in ledger
