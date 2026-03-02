## ADDED Requirements

### Requirement: OpenSpec Runtime Root Unification
The system SHALL use `openspec/runtime/` as the canonical runtime artifact root
for all command-level artifact discovery and contract write-back.

#### Scenario: Commands resolve upstream artifacts from OpenSpec runtime root
- GIVEN a command enters Step 1 upstream detection
- WHEN it scans candidate artifacts
- THEN it scans `openspec/runtime/**` as the primary runtime path set
- AND it does not require `ai-content-output/**` for normal operation

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

## MODIFIED Requirements

### Requirement: Business Command Compatibility Layer
Business command compatibility SHALL remain contract-first with standalone execution,
while standalone path examples are updated to `openspec/runtime/**`.

#### Scenario: Standalone fallback remains valid on new root
- GIVEN no explicit contract path is provided
- WHEN a command runs in standalone mode
- THEN it discovers and writes artifacts under `openspec/runtime/**`
- AND command usability remains unchanged for users

## REMOVED Requirements

<!-- None in this phase -->
