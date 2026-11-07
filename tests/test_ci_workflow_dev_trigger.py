"""Static guard against duplicate full CI runs for a modernization branch commit.

Full CI must run on REST-driven branch updates, but the push and pull-request
workflows for a shared source branch should use one cancellation group.
"""
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
CI = ROOT / ".github" / "workflows" / "ci.yml"


def test_modernization_ci_has_push_and_pull_request_triggers():
    workflow = CI.read_text(encoding="utf-8")
    assert "pull_request:" in workflow
    assert "branches: [main]" in workflow
    assert "branches: [main, engineering/modernization-foundation]" in workflow


def test_modernization_push_and_pr_share_concurrency_namespace():
    workflow = CI.read_text(encoding="utf-8")
    assert "github.event.pull_request.head.repo.full_name || github.repository" in workflow
    assert "github.event.pull_request.head.ref || github.ref_name || github.sha" in workflow
    assert "github.event_name == 'pull_request'" in workflow
    assert "github.ref_name == 'engineering/modernization-foundation'" in workflow
