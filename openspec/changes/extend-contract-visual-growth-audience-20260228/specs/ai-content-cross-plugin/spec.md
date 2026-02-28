## ADDED Requirements

### Requirement: Repository-wide OpenSpec Lifecycle Coverage
All command entrypoints SHALL support OpenSpec lifecycle handoff for intermediate artifacts.

#### Scenario: Every command supports OpenSpec argument intake
- GIVEN any command under `*/commands/*.md`
- WHEN input parsing starts
- THEN the command accepts `.openspec.json` and/or `pipeline.openspec.json` as first-class inputs
- AND documents contract-aware usage in `argument-hint`

#### Scenario: Every command defines deterministic handoff blocks
- GIVEN any command execution finishes
- WHEN handoff stage is reached
- THEN command doc includes `Artifact Handoff`
- AND includes OpenSpec write-back or OpenSpec contract creation guidance
- AND includes a deterministic next-step routing suggestion

### Requirement: Contract-First Resolution for All Command Layers
All commands SHALL follow a uniform input resolution order with contract priority.

#### Scenario: Resolution order is enforced
- GIVEN command starts without user interaction
- WHEN upstream input detection runs
- THEN it resolves in order: explicit argument -> OpenSpec contract scan -> legacy path scan -> user prompt
- AND does not skip contract scan when available

### Requirement: Mixed Contract Types Are Supported
The system SHALL support both pipeline contracts and stage-local OpenSpec contracts.

#### Scenario: Pipeline contract path is available
- GIVEN `ai-content-output/deep-research/<slug>/pipeline.openspec.json` exists
- WHEN a contract-aware command runs
- THEN stage and `outputs.*` updates occur in-place for traceability

#### Scenario: Stage-local contract path is available
- GIVEN a stage output uses `*.openspec.json` (e.g., `trend-preview`, `news-search`, `events`)
- WHEN downstream command runs
- THEN it can consume stage-local contracts as upstream input
- AND persists next-step metadata in the same local contract namespace

## MODIFIED Requirements

### Requirement: OpenSpec Pipeline Contract Handoff
Pipeline handoff SHALL expand from partial plugin coverage to full command coverage across the repository.

#### Scenario: Extended command layers preserve backward compatibility
- GIVEN legacy runtime paths and filenames are already used in workflows
- WHEN all commands become contract-aware
- THEN existing artifact paths remain valid
- AND OpenSpec metadata is additive, not destructive

### Requirement: P0 Artifact Handoff Rules
P0 rules SHALL remain baseline while non-P0 commands adopt the same contract-first conventions.

#### Scenario: Non-P0 commands do not break standalone mode
- GIVEN a command runs without any contract
- WHEN execution completes
- THEN standalone output behavior remains valid
- AND users can still run commands independently

## REMOVED Requirements

None.
