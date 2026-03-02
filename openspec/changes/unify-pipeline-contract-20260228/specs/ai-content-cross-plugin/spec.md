## ADDED Requirements

### Requirement: OpenSpec Pipeline Contract Handoff
The system SHALL use `pipeline.openspec.json` as the canonical handoff contract across P0 pipeline stages.

#### Scenario: Topic research emits initial contract
- GIVEN a deep-research run completes Task 1~5
- WHEN the command finishes artifact handoff
- THEN it writes `openspec/runtime/deep-research/<slug>/pipeline.openspec.json`
- AND sets `stage=topic-research`
- AND sets `next.command=/content-production:long-article`

#### Scenario: Downstream stages update in-place
- GIVEN an existing pipeline contract
- WHEN long-article, markdown-to-html, or post-to-wechat runs
- THEN each stage updates `stage`, `outputs.*`, and `next.*` in the same contract file
- AND preserves previous output references for traceability

### Requirement: Contract-First Input Resolution
The system SHALL prioritize OpenSpec contract input before legacy auto-scan fallback.

#### Scenario: Contract path provided explicitly
- GIVEN a user passes `pipeline.openspec.json`
- WHEN command input detection starts
- THEN the command reads contract outputs as primary input
- AND skips legacy path discovery logic

### Requirement: Extended Intake and Quality Contracts
The system SHALL support OpenSpec-compatible handoff at intake stages and quality gate stage.

#### Scenario: Daily brief and brainstorm emit upstream contracts
- GIVEN daily-brief or brainstorm command completes output generation
- WHEN artifact handoff runs
- THEN it creates or updates a same-stage `.openspec.json` contract
- AND sets `next.command` as a single downstream topic-research route

#### Scenario: Quality check updates pipeline decision
- GIVEN quality-check runs with an existing deep-research pipeline contract
- WHEN the scorecard is finalized
- THEN it writes `outputs.quality_report_md`
- AND updates `next.command` to one downstream route based on pass/fail decision

## MODIFIED Requirements

### Requirement: P0 Artifact Handoff Rules
P0 command handoff SHALL include mandatory contract write-back in addition to existing output files.

#### Scenario: Existing output naming remains compatible
- GIVEN legacy downstream consumers still read existing markdown/html paths
- WHEN contract write-back is enabled
- THEN original runtime file names remain unchanged
- AND new contract acts as an extra orchestration layer

## REMOVED Requirements

<!-- None in this phase -->
