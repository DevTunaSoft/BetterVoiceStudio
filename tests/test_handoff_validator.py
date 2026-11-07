import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "validate_handoff.py"
spec = importlib.util.spec_from_file_location("handoff_validator", MODULE_PATH)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class HandoffValidatorTests(unittest.TestCase):
    def test_repository_handoff_is_structurally_valid(self):
        self.assertEqual(module.validate(MODULE_PATH.parents[1]), [])

    def test_missing_master_handoff_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            errors = module.validate(Path(tmp))
            self.assertTrue(any("Missing" in error for error in errors))

    def test_invalid_log_is_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "handoff").mkdir()
            original = (MODULE_PATH.parents[1] / "handoff" / "MASTER_HANDOFF.md").read_text()
            (root / "handoff" / "MASTER_HANDOFF.md").write_text(original)
            (root / "handoff" / "ACTION_LOG.jsonl").write_text('{"action_id":"duplicate"}\nnot-json\n')
            errors = module.validate(root)
            self.assertTrue(any("missing timestamp" in error for error in errors))
            self.assertTrue(any("Action log line 2" in error for error in errors))

    def test_duplicate_ids_are_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "handoff").mkdir()
            (root / "handoff" / "MASTER_HANDOFF.md").write_text(
                (MODULE_PATH.parents[1] / "handoff" / "MASTER_HANDOFF.md").read_text()
            )
            record = {field: "value" for field in module.REQUIRED_ACTION_FIELDS}
            record["action_id"] = "duplicate"
            (root / "handoff" / "ACTION_LOG.jsonl").write_text(
                json.dumps(record) + "\n" + json.dumps(record) + "\n"
            )
            self.assertTrue(any("Duplicate action ID" in e for e in module.validate(root)))


if __name__ == "__main__":
    unittest.main()
