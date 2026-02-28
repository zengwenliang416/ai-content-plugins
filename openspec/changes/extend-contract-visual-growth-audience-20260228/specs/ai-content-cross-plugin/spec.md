## ADDED Requirements

### Requirement: Extended Contract Coverage for Visual/Growth/Audience Command Layers
The system SHALL extend `pipeline.openspec.json` handoff coverage to
`visual-content`, `growth-ops`, and `audience-management` command layers.

#### Scenario: Visual-content commands write back stage and visual artifacts
- GIVEN a command in `visual-content` runs with an existing pipeline contract
- WHEN `article-illustrator`, `cover-image`, or `infographic` completes
- THEN the command updates `stage=visual-content` in-place
- AND writes deterministic visual output fields under `outputs.*`
- AND preserves existing non-visual outputs for traceability

#### Scenario: Growth-ops commands update gate and feedback artifacts
- GIVEN a command in `growth-ops` runs with a pipeline contract
- WHEN `screen-topic`, `review-checklist`, or `performance` completes
- THEN the command updates `stage=growth-ops`
- AND writes corresponding `outputs.*` fields for screening/checklist/performance
- AND sets `next.command` and `next.input` based on the decision result

#### Scenario: Audience-management commands persist strategy outputs
- GIVEN a command in `audience-management` runs with a pipeline contract
- WHEN `content-plan`, `content-rebalance`, or `ops-report` completes
- THEN the command updates `stage=audience-management`
- AND writes strategy artifact paths to deterministic `outputs.*` fields
- AND keeps upstream research/production artifacts intact

### Requirement: Contract-First Intake for Extended Command Layers
The system SHALL prioritize OpenSpec contract input before legacy fallback in all
contract-aware commands of the three extended plugins.

#### Scenario: Explicit contract argument is provided
- GIVEN a user passes `pipeline.openspec.json` to an extended command
- WHEN input detection starts
- THEN the command resolves primary inputs from `outputs.*` and `inputs.*` in contract first
- AND skips legacy path auto-discovery unless required fields are missing

#### Scenario: Contract auto-scan fallback is triggered
- GIVEN no explicit argument is provided
- WHEN the command scans recent runtime artifacts
- THEN it checks recent `pipeline.openspec.json` files before legacy markdown/image paths
- AND asks user for manual input only when both contract and legacy artifacts are absent

## MODIFIED Requirements

### Requirement: OpenSpec Pipeline Contract Handoff
The pipeline contract handoff SHALL expand from P0-only transition to include
visual/growth/audience branch stages as first-class contract stages.

#### Scenario: Extended stage update remains backward compatible
- GIVEN a pipeline contract already contains P0 stage outputs
- WHEN an extended-stage command writes new fields
- THEN existing `research_md`/`analysis_md`/`article_md`/`article_html` references remain unchanged
- AND extended-stage output keys are appended without destructive overwrite

### Requirement: P0 Artifact Handoff Rules
P0 artifact handoff SHALL remain the baseline while allowing extended command
layers to add branch-stage metadata in the same contract file.

#### Scenario: Standalone mode still works without contract
- GIVEN a user runs an extended command without contract context
- WHEN command execution completes in standalone mode
- THEN legacy output path conventions remain valid
- AND command behavior stays usable without requiring contract creation

## REMOVED Requirements

None.
