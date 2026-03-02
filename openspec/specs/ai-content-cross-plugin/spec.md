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
Business command compatibility SHALL remain contract-first with standalone execution,
while standalone path examples are updated to `openspec/runtime/**`.

#### Scenario: Standalone fallback remains valid on new root
- GIVEN no explicit contract path is provided
- WHEN a command runs in standalone mode
- THEN it discovers and writes artifacts under `openspec/runtime/**`
- AND command usability remains unchanged for users

### Requirement: OpenSpec Runtime Root Unification
The system SHALL use `openspec/runtime/` as the canonical runtime artifact root
for all command-level artifact discovery and contract write-back.

#### Scenario: Commands resolve upstream artifacts from OpenSpec runtime root
- GIVEN a command enters Step 1 upstream detection
- WHEN it scans candidate artifacts
- THEN it scans `openspec/runtime/**` as the primary runtime path set
- AND it does not require any legacy runtime root for normal operation

#### Scenario: Pipeline contract write-back uses OpenSpec runtime root
- GIVEN a command updates pipeline handoff state
- WHEN it writes `pipeline.openspec.json`
- THEN the contract path is `openspec/runtime/deep-research/<slug>/pipeline.openspec.json`
- AND downstream `next.input` references the same OpenSpec runtime rooted contract

### Requirement: Contract Structure Stability During Root Migration
The system SHALL preserve existing contract field structure while migrating runtime roots.

#### Scenario: Contract schema remains stable
- GIVEN runtime path roots are migrated
- WHEN a stage writes handoff fields
- THEN required keys remain `pipeline`, `stage`, `inputs`, `outputs`, and `next`
- AND `next.command` remains single-route command semantics

