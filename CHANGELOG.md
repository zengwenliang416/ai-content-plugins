# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Rebuild llmdoc documentation for OpenClaw 3-agent architecture — 14 new docs replacing 9 plugin-era docs (llmdoc)
- Update skill definitions across all 3 agent workspaces for OpenClaw conventions (researcher, writer, operator)

### Fixed

- Add OpenClaw agent registration, Python feedparser check, and news-search symlinks to install script (install)

### Added

- Add news-search multi-platform search skill and commands supporting 12+ platforms (topic-research)
- Integrate news-search platform sources into all plugin skills with 24h freshness protocol (skills)
- Add AskUserQuestion bilingual language selection to all content-analysis commands (content-analysis)
- Add AskUserQuestion bilingual language selection to all content-production commands (content-production)
- Add AskUserQuestion bilingual language selection to all topic-research commands (topic-research)
- Add AskUserQuestion bilingual language selection to all growth-ops commands (growth-ops)
- Add AskUserQuestion bilingual language selection to all audience-management commands (audience-management)
