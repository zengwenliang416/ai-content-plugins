## ADDED Requirements

### Requirement: Workflow-Centric OpenSpec Lifecycle Source of Truth
The system SHALL treat `openspec/changes/<change_id>/` as the primary lifecycle
unit for proposal, review, validation, apply, and archive.

#### Scenario: Change directory is the canonical lifecycle boundary
- GIVEN a change is created
- WHEN users inspect lifecycle state
- THEN proposal/spec/tasks under `openspec/changes/<change_id>/` are the
  canonical source
- AND lifecycle decisions are made at workflow level instead of per-command
  long-form contract scanning

### Requirement: Workflow-Level Command Surface
The system SHALL provide a workflow-level command surface that is sufficient to
manage a change end-to-end.

#### Scenario: list and view expose workflow state
- GIVEN one or more changes exist
- WHEN `list` or `view` is executed
- THEN users can discover change ids and inspect the lifecycle artifacts
  (`proposal.md`, `specs/**/spec.md`, `tasks.md`)

#### Scenario: validate gates change quality
- GIVEN a change is ready for review
- WHEN `validate` runs for a single change or all changes
- THEN schema/spec/task integrity is checked before apply
- AND validation output is used as release gate evidence

#### Scenario: apply and archive close the lifecycle loop
- GIVEN a validated and approved change
- WHEN `apply` is executed and work is completed
- THEN the change can be transitioned to archived state via `archive`
- AND lifecycle history remains traceable at change-directory level

### Requirement: Business Command Compatibility Without Heavy Inline Scanning
Business command docs SHALL remain compatible with OpenSpec contracts without
being forced to embed long lifecycle-scanning logic.

#### Scenario: Lightweight compatibility path remains available
- GIVEN a business command that already supports `.openspec.json` or
  `pipeline.openspec.json`
- WHEN it is invoked with explicit contract input
- THEN contract-aware behavior remains available
- AND legacy path fallback continues to work for standalone usage

## MODIFIED Requirements

### Requirement: OpenSpec Pipeline Contract Handoff
Pipeline handoff SHALL remain supported, but lifecycle governance shifts from
repo-wide per-command coverage to workflow-centric change management.

#### Scenario: Compatibility is preserved during governance shift
- GIVEN existing workflows rely on legacy artifact paths and contract files
- WHEN workflow-centric governance is adopted
- THEN existing artifact names and directories remain valid
- AND OpenSpec metadata remains additive and non-destructive

### Requirement: P0 Artifact Handoff Rules
P0 handoff rules SHALL stay as baseline compatibility behavior rather than a
mandate to expand heavy scanning blocks into every business command doc.

#### Scenario: Standalone command mode stays intact
- GIVEN a command runs without contract context
- WHEN execution completes
- THEN standalone output behavior remains valid
- AND workflow-level lifecycle operations still govern change progression

## REMOVED Requirements

### Requirement: Repository-wide OpenSpec Lifecycle Coverage
Removed as a global MUST. Replaced by workflow-centric lifecycle governance at
`openspec/changes/<change_id>/`.

### Requirement: Contract-First Resolution for All Command Layers
Removed as a repository-wide MUST. Now treated as compatibility behavior only
for commands that explicitly implement contract-aware intake.
