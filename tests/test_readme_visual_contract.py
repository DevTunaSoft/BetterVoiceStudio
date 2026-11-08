"""README screenshot and packaged-runtime smoke contracts for BetterVoiceStudio.

These checks prevent a broken homepage gallery and ensure packaged acceptance
checks the CPU runtime choice inside the launched Electron process rather than
only in the GitHub Actions shell.
"""
from pathlib import Path
import re

import pytest

ROOT = Path(__file__).resolve().parent.parent
README = ROOT / "README.md"
EXPECTED = (
    "docs/media/electron/voice-cloning.webp",
    "docs/media/electron/voice-design.webp",
    "docs/media/electron/dubbing.webp",
    "docs/media/electron/models.webp",
    "docs/media/electron/model-packs.webp",
)


def test_readme_gallery_uses_existing_local_images():
    text = README.read_text(encoding="utf-8")
    assert "## Inside the studio" in text
    gallery = text.split("## Inside the studio", 1)[1].split("## Our direction", 1)[0]
    for path in EXPECTED:
        assert path in gallery
    # Every image must stay repository-local and include an accessible alt.
    images = re.findall(r'<img\b[^>]*>', gallery)
    assert len(images) >= 4
    for image in images:
        source = re.search(r'\bsrc="([^"]+)"', image)
        assert source, image
        assert re.search(r'\balt="[^"]+"', image), image
        path = ROOT / source.group(1)
        assert path.is_file(), f"README image missing: {path}"
        assert path.resolve().is_relative_to(ROOT.resolve()), "README image escaped repository"


@pytest.mark.parametrize("relative", EXPECTED)
def test_readme_gallery_webp_files_are_validly_identified(relative):
    # A broken or misleading asset filename should fail before publication.
    header = (ROOT / relative).read_bytes()[:12]
    assert len(header) == 12
    assert header[:4] == b"RIFF" and header[8:12] == b"WEBP", relative


def test_packaged_windows_smokes_verify_cpu_inside_electron():
    smoke = (ROOT / "electron/tests/packaged-smoke.mjs").read_text(encoding="utf-8")
    workflow = (ROOT / ".github/workflows/electron-build.yml").read_text(
        encoding="utf-8"
    )
    assert "Packaged Electron lost CPU runtime choice" in smoke
    assert "actual.arch, targetArch" in smoke
    assert smoke.count("VOICESTUDIO_TEST_EXPECT_TORCH_VARIANT") >= 1
    assert workflow.count("VOICESTUDIO_TEST_EXPECT_TORCH_VARIANT:") == 2
    assert workflow.count("OMNIVOICE_TORCH_VARIANT:") == 2
    # A screenshot from the actual packaged Windows x64 app is saved alongside
    # its installer, never substituted with an unverified illustration.
    assert "VOICESTUDIO_SCREENSHOT:" in workflow
    assert "electron/release/BetterVoiceStudio-model-manager-win-x64.png" in workflow
    assert "matrix.arch == 'x64'" in workflow
    assert "Packaged screenshot is not a PNG" in smoke
    assert "Packaged GUI screenshot was not saved" in smoke
    assert "screenshot.readUInt32BE(16)" in smoke
    assert "screenshot.length >= 8192" in smoke
