#!/usr/bin/env python3
from __future__ import annotations

from dataclasses import dataclass
from datetime import date
import filecmp
from pathlib import Path
import re
import shutil


RESOURCE_DIRS = ("references", "scripts", "assets", "prompts", "agents")
WORKFLOW_ORDER = [
    "audience-management",
    "content-analysis",
    "content-hooks",
    "content-production",
    "content-repurpose",
    "content-utilities",
    "growth-ops",
    "publishing",
    "topic-research",
    "visual-content",
]


@dataclass(frozen=True)
class SkillMapping:
    workflow: str
    target_skill: str
    source_plugin: str
    source_skill: str
    source_command: str | None = None


MAPPINGS = [
    SkillMapping("audience-management", "am-audience-review", "audience-management", "audience-review"),
    SkillMapping("audience-management", "am-biz-proposal", "audience-management", "biz-proposal"),
    SkillMapping("audience-management", "am-cleanup", "audience-management", "content-cleanup"),
    SkillMapping("audience-management", "am-content-plan", "audience-management", "content-plan"),
    SkillMapping("audience-management", "am-content-rebalance", "audience-management", "content-rebalance"),
    SkillMapping("audience-management", "am-ops-report", "audience-management", "ops-report"),
    SkillMapping("content-analysis", "ca-benchmark", "content-analysis", "content-benchmark"),
    SkillMapping("content-analysis", "ca-check-quality", "content-analysis", "quality-check"),
    SkillMapping("content-analysis", "ca-competitor", "content-analysis", "competitor-analysis"),
    SkillMapping("content-analysis", "ca-debug-draft", "content-analysis", "draft-debugger"),
    SkillMapping("content-analysis", "ca-skill-creator", "content-analysis", "skill-creator"),
    SkillMapping("content-analysis", "ca-template", "content-analysis", "template-creator"),
    SkillMapping("content-analysis", "ca-trend-analysis", "content-analysis", "trend-analysis"),
    SkillMapping("content-hooks", "ch-headline-optimizer", "content-hooks", "headline-optimizer", "headline"),
    SkillMapping("content-hooks", "ch-hook-generator", "content-hooks", "hook-generator", "hook"),
    SkillMapping("content-production", "cp-ab-test", "content-production", "content-experiment"),
    SkillMapping("content-production", "cp-asset-pack", "content-production", "asset-pack"),
    SkillMapping("content-production", "cp-audience", "content-production", "audience-targeting"),
    SkillMapping("content-production", "cp-collab-letter", "content-production", "collab-letter"),
    SkillMapping("content-production", "cp-content-tracker", "content-production", "content-tracker"),
    SkillMapping("content-production", "cp-infographic", "content-production", "infographic"),
    SkillMapping("content-production", "cp-long-article", "content-production", "article-builder"),
    SkillMapping("content-production", "cp-presentation", "content-production", "presentation"),
    SkillMapping("content-production", "cp-short-post", "content-production", "short-post"),
    SkillMapping("content-repurpose", "cr-content-repurposer", "content-repurpose", "content-repurposer", "repurpose"),
    SkillMapping("content-utilities", "humanizer", "content-utilities", "humanizer"),
    SkillMapping("content-utilities", "image-compressor", "content-utilities", "image-compressor"),
    SkillMapping("content-utilities", "md-formatter", "content-utilities", "md-formatter"),
    SkillMapping("content-utilities", "md-to-html", "content-utilities", "md-to-html"),
    SkillMapping("content-utilities", "tweet-clipper", "content-utilities", "tweet-clipper"),
    SkillMapping("content-utilities", "web-clipper", "content-utilities", "web-clipper"),
    SkillMapping("growth-ops", "go-account-portfolio", "growth-ops", "account-monitor"),
    SkillMapping("growth-ops", "go-collab-prep", "growth-ops", "collab-prep"),
    SkillMapping("growth-ops", "go-content-roi", "growth-ops", "content-roi"),
    SkillMapping("growth-ops", "go-find-sources", "growth-ops", "source-discovery"),
    SkillMapping("growth-ops", "go-growth-plan", "growth-ops", "growth-plan"),
    SkillMapping("growth-ops", "go-performance", "growth-ops", "performance-analysis"),
    SkillMapping("growth-ops", "go-review-checklist", "growth-ops", "review-checklist"),
    SkillMapping("growth-ops", "go-screen-topic", "growth-ops", "topic-screening"),
    SkillMapping("growth-ops", "go-strategy-memo", "growth-ops", "strategy-memo"),
    SkillMapping("publishing", "publishing-post-to-wechat", "publishing", "wechat-publisher"),
    SkillMapping("publishing", "publishing-post-to-x", "publishing", "x-publisher"),
    SkillMapping("topic-research", "tr-brainstorm", "topic-research", "topic-brainstorm"),
    SkillMapping("topic-research", "tr-daily-brief", "topic-research", "daily-brief"),
    SkillMapping("topic-research", "tr-deep-research", "topic-research", "deep-research"),
    SkillMapping("topic-research", "tr-events", "topic-research", "event-calendar"),
    SkillMapping("topic-research", "tr-field-overview", "topic-research", "field-overview"),
    SkillMapping("topic-research", "tr-narrative", "topic-research", "narrative-tracker"),
    SkillMapping("topic-research", "tr-news-search", "topic-research", "news-search"),
    SkillMapping("topic-research", "tr-news-search-setup", "topic-research", "news-search-setup"),
    SkillMapping("topic-research", "tr-release-analysis", "topic-research", "release-analysis"),
    SkillMapping("topic-research", "tr-repo-analysis", "topic-research", "repo-analysis", "repo-analysis"),
    SkillMapping("topic-research", "tr-trend-preview", "topic-research", "trend-preview"),
    SkillMapping("topic-research", "tr-update-research", "topic-research", "research-updater"),
    SkillMapping("visual-content", "vc-ai-image-gen", "visual-content", "ai-image-gen"),
    SkillMapping("visual-content", "vc-article-illustrator", "visual-content", "article-illustrator"),
    SkillMapping("visual-content", "vc-comic", "visual-content", "knowledge-comic"),
    SkillMapping("visual-content", "vc-cover-image", "visual-content", "cover-generator"),
    SkillMapping("visual-content", "vc-infographic", "visual-content", "infographic-gen"),
    SkillMapping("visual-content", "vc-slide-deck", "visual-content", "slide-generator"),
    SkillMapping("visual-content", "vc-xhs-images", "visual-content", "xhs-card"),
]


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def codex_root() -> Path:
    return repo_root() / "codex-cli"


def workflows_root() -> Path:
    return codex_root() / "workflows"


def strip_frontmatter(text: str) -> str:
    match = re.match(r"\A---\n.*?\n---\n?", text, flags=re.DOTALL)
    if match:
        return text[match.end() :].lstrip("\n")
    return text.lstrip("\n")


def command_frontmatter(text: str) -> tuple[str | None, str | None]:
    match = re.match(r"\A---\n(.*?)\n---\n?", text, flags=re.DOTALL)
    if not match:
        return None, None

    description = None
    argument_hint = None
    for line in match.group(1).splitlines():
        if line.startswith("description:"):
            description = line.split(":", 1)[1].strip()
        elif line.startswith("argument-hint:"):
            argument_hint = line.split(":", 1)[1].strip().strip('"')
    return description, argument_hint


def escape_yaml(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def copy_tree(src_dir: Path, dest_dir: Path) -> int:
    copied = 0
    for src_file in src_dir.rglob("*"):
        if src_file.is_dir():
            continue
        rel = src_file.relative_to(src_dir)
        dest_file = dest_dir / rel
        dest_file.parent.mkdir(parents=True, exist_ok=True)
        if dest_file.exists() and filecmp.cmp(src_file, dest_file, shallow=False):
            continue
        shutil.copy2(src_file, dest_file)
        copied += 1
    return copied


def ensure_skill_md(mapping: SkillMapping) -> bool:
    target_dir = workflows_root() / mapping.workflow / "skills" / mapping.target_skill
    target_dir.mkdir(parents=True, exist_ok=True)
    target_file = target_dir / "SKILL.md"
    if target_file.exists():
        return False

    source_skill_file = repo_root() / mapping.source_plugin / "skills" / mapping.source_skill / "SKILL.md"
    skill_body = strip_frontmatter(source_skill_file.read_text())

    command_body = None
    description = None
    argument_hint = None
    if mapping.source_command:
        command_file = repo_root() / mapping.source_plugin / "commands" / f"{mapping.source_command}.md"
        command_text = command_file.read_text()
        description, argument_hint = command_frontmatter(command_text)
        command_body = strip_frontmatter(command_text)

    if not description:
        description = f"Synced Codex skill for {mapping.source_skill}"

    frontmatter = [
        "---",
        f"name: {mapping.target_skill}",
        f'description: "{escape_yaml(description)}"',
    ]
    if argument_hint:
        frontmatter.extend(
            [
                "arguments:",
                "  - name: input",
                f'    description: "{escape_yaml(argument_hint.strip("[]"))}"',
            ]
        )
    frontmatter.append("---")

    parts = []
    if command_body:
        parts.append(command_body.strip())
    parts.append(skill_body.strip())

    target_file.write_text("\n".join(frontmatter) + "\n\n" + "\n\n".join(parts) + "\n")
    return True


def sync_resources(mapping: SkillMapping) -> int:
    source_dir = repo_root() / mapping.source_plugin / "skills" / mapping.source_skill
    target_dir = workflows_root() / mapping.workflow / "skills" / mapping.target_skill
    target_dir.mkdir(parents=True, exist_ok=True)

    copied = 0
    for dirname in RESOURCE_DIRS:
        src = source_dir / dirname
        if not src.exists():
            continue
        copied += copy_tree(src, target_dir / dirname)
    return copied


def write_config() -> Path:
    config_file = codex_root() / ".codex" / "config.toml"
    config_file.parent.mkdir(parents=True, exist_ok=True)

    grouped: dict[str, list[str]] = {workflow: [] for workflow in WORKFLOW_ORDER}
    for workflow in WORKFLOW_ORDER:
        skill_files = sorted((workflows_root() / workflow / "skills").glob("*/SKILL.md"))
        grouped[workflow] = [skill_file.parent.name for skill_file in skill_files]

    total_skills = sum(len(skills) for skills in grouped.values())
    lines = [
        "# AI Content Plugins -- Codex CLI Central Registration",
        f"# Generated: {date.today().isoformat()}",
        f"# Total: {total_skills} skills across {len([w for w in WORKFLOW_ORDER if grouped[w]])} workflows",
        "",
        "[skills]",
        "enabled = true",
        "",
    ]

    for workflow in WORKFLOW_ORDER:
        skills = grouped[workflow]
        if not skills:
            continue
        lines.append(f"# -- {workflow} ({len(skills)}) --")
        for skill_name in skills:
            lines.extend(
                [
                    "[[skills.config]]",
                    f'path = "../workflows/{workflow}/skills/{skill_name}/SKILL.md"',
                    "enabled = true",
                    "",
                ]
            )

    config_file.write_text("\n".join(lines).rstrip() + "\n")
    return config_file


def main() -> int:
    created = 0
    copied = 0
    for mapping in MAPPINGS:
        if ensure_skill_md(mapping):
            created += 1
        copied += sync_resources(mapping)

    config_file = write_config()
    print(f"Created missing skill files: {created}")
    print(f"Copied resource files: {copied}")
    print(f"Updated config: {config_file.relative_to(repo_root())}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
