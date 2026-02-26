# AI Content Plugins

This is a marketplace of Claude Cowork plugins for AI content creators and account operators. Each subdirectory is a standalone plugin.

## Repository Structure

```
├── content-analysis/      # Content analysis and benchmarking
├── topic-research/        # Topic research and trend tracking
├── content-production/    # Article and content creation
├── growth-ops/            # Growth operations and optimization
└── audience-management/   # Audience analytics and planning
```

## Plugin Structure

Each plugin follows this layout:
```
plugin-name/
├── .claude-plugin/plugin.json   # Plugin manifest (name, description, version)
├── commands/                    # Slash commands (.md files)
├── skills/                      # Knowledge files for specific tasks
├── hooks/                       # Event-driven automation
└── .claude/                     # User settings (*.local.md)
```

## Key Files

- `marketplace.json`: Marketplace manifest - registers all plugins with source paths
- `plugin.json`: Plugin metadata - name, description, version, and component discovery settings
- `commands/*.md`: Slash commands invoked as `/plugin:command-name`
- `skills/*/SKILL.md`: Detailed knowledge and workflows for specific tasks
- `*.local.md`: User-specific configuration (gitignored)

## Development Workflow

1. Edit markdown files directly - changes take effect immediately
2. Test commands with `/plugin:command-name` syntax
3. Skills are invoked automatically when their trigger conditions match
