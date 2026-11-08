#!/usr/bin/env python3
"""Structural checks for the living BetterVoiceStudio user manual.

This does not certify that instructions match a running application.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
GUIDE = ROOT / "docs" / "user-guide"
PAGES = ["README.md", "DOCUMENTATION_STANDARD.md", "installation.md",
         "models.md", "workflows.md", "troubleshooting.md", "feature-verification.md"]
REQUIRED = {
    "README.md": ["## Start here", "## Documentation acceptance rule"],
    "DOCUMENTATION_STANDARD.md": ["## Mandatory content for each workflow",
                                  "## Documentation release gates", "## Workflow page template"],
    "feature-verification.md": ["Functional verification", "Required evidence"],
}
LINK = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")

def validate(root=ROOT):
    errors = []
    guide = root / "docs" / "user-guide"
    for filename in PAGES:
        path = guide / filename
        if not path.is_file():
            errors.append(f"Missing user guide page: {filename}")
            continue
        text = path.read_text(encoding="utf-8")
        if not text.startswith("# "):
            errors.append(f"{filename}: missing H1 title")
        for section in REQUIRED.get(filename, []):
            if section not in text:
                errors.append(f"{filename}: missing {section}")
        for target in LINK.findall(text):
            if target.startswith(("http:", "https:", "mailto:", "#")):
                continue
            dest = target.split("#", 1)[0]
            if dest and not (path.parent / dest).is_file():
                errors.append(f"{filename}: broken relative link {target}")
    return errors

if __name__ == "__main__":
    problems = validate()
    for problem in problems:
        print("FAIL:", problem)
    if problems:
        sys.exit(1)
    print("PASS: user guide pages, required sections and relative links")
