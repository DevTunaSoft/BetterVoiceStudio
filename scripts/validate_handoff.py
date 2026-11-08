#!/usr/bin/env python3
"""Fail closed on missing or internally inconsistent engineering handoff metadata."""
from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path

REQUIRED = (
    "## Purpose and non-negotiable constraints",
    "## Recovery instructions",
    "## Architecture and feature inventory",
    "## Requirements / implementation matrix",
    "## Known defects and risks",
    "## Verified test evidence vs unverified claims",
    "## Setup / build / test starting points",
    "## Immediate exact next actions",
    "## Rollback and recovery",
    "## Initial checkpoint",
)
REQUIRED_ACTION_FIELDS = ("action_id", "timestamp", "branch", "objective", "changes", "verification", "next_action")

def validate(root: Path) -> list[str]:
    errors: list[str] = []
    path = root / "handoff" / "MASTER_HANDOFF.md"
    if not path.is_file():
        return [f"Missing {path}"]
    content = path.read_text(encoding="utf-8")
    for heading in REQUIRED:
        if heading not in content:
            errors.append(f"Missing handoff section: {heading}")
    if "NOT release ready" not in content and "Release candidate" not in content:
        errors.append("Handoff must state release readiness explicitly")
    log = root / "handoff" / "ACTION_LOG.jsonl"
    if not log.is_file():
        errors.append("Missing handoff/ACTION_LOG.jsonl")
    else:
        seen: set[str] = set()
        for number, line in enumerate(log.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip():
                errors.append(f"Action log line {number}: blank checkpoint")
                continue
            try:
                record = json.loads(line)
                if not isinstance(record, dict):
                    raise ValueError("record must be a JSON object")
                for field in REQUIRED_ACTION_FIELDS:
                    if not isinstance(record.get(field), str) or not record[field].strip():
                        errors.append(f"Action log line {number}: missing {field}")
                stamp = record.get("timestamp")
                if isinstance(stamp, str) and stamp.strip():
                    try:
                        parsed = datetime.fromisoformat(stamp.replace("Z", "+00:00"))
                        if parsed.tzinfo is None or parsed.utcoffset() is None:
                            raise ValueError("timezone required")
                    except ValueError:
                        errors.append(f"Action log line {number}: invalid timezone-aware ISO timestamp")
                action_id = record.get("action_id")
                if isinstance(action_id, str):
                    if action_id in seen:
                        errors.append(f"Duplicate action ID: {action_id}")
                    seen.add(action_id)
            except (ValueError, json.JSONDecodeError) as exc:
                errors.append(f"Action log line {number}: {exc}")
        if not seen:
            errors.append("Action log must contain at least one checkpoint")
    return errors

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    errors = validate(args.root)
    for error in errors:
        print(f"FAIL: {error}")
    if errors:
        return 1
    print("PASS: handoff structure and action-log schema")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
