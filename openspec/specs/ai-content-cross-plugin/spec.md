## Purpose
This spec defines workflow-centric OpenSpec lifecycle governance for cross-plugin
content workflows while preserving standalone command usability and backward
compatibility of existing artifact paths.

## Requirements

### Requirement: Workflow-Centric OpenSpec Lifecycle Governance
The system SHALL treat each `openspec/changes/<change_id>/` directory as the
primary lifecycle unit for proposal, review, validation, apply, and archive.

#### Scenario: Change directory is the lifecycle source of truth
- **GIVEN** a change has been created under `openspec/changes/`
- **WHEN** contributors inspect lifecycle state
- **THEN** `proposal.md`, `tasks.md`, and `specs/**/spec.md` inside that
  change directory define the authoritative lifecycle status
- **AND** lifecycle decisions are tracked at workflow level rather than by
  forcing every business command doc to carry full lifecycle orchestration

### Requirement: Workflow-Level Lifecycle Command Surface
The system SHALL provide a workflow-level command surface that is sufficient to
complete lifecycle management for a change.

#### Scenario: Workflow commands are sufficient for end-to-end lifecycle
- **GIVEN** a change is being managed from draft to completion
- **WHEN** users run `list`, `view`, `validate`, `apply`, and `archive`
- **THEN** users can discover, inspect, gate, execute, and close the change
  lifecycle without introducing extra repository-specific lifecycle commands

#### Scenario: Validation is the mandatory quality gate
- **GIVEN** a change is ready to be executed or archived
- **WHEN** `openspec validate` runs in strict mode
- **THEN** change/spec/task structure errors are surfaced before apply/archive
- **AND** validation output is retained as release gate evidence

### Requirement: Business Command Compatibility Layer
Business command documentation SHALL remain contract-compatible while
supporting standalone execution.

#### Scenario: Contract-aware input remains available
- **GIVEN** a command receives `.openspec.json` or `pipeline.openspec.json`
- **WHEN** the command resolves upstream context
- **THEN** the command consumes contract fields as preferred context
- **AND** it can update stage-local contract outputs when the workflow requires

#### Scenario: Standalone fallback remains valid
- **GIVEN** no OpenSpec contract file is provided
- **WHEN** the command executes in standalone mode
- **THEN** legacy artifact path behavior remains valid
- **AND** compatibility with existing workflows is preserved
