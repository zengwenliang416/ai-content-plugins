#!/usr/bin/env bash
set -euo pipefail

# ── AI Content Plugins — Codex CLI Bundle Installer ─────────────────
# Installs workflows (skills) from source into Codex CLI runtime locations.
#
# Usage:
#   ./install-codex-bundle.sh --scope user [--workflows wf1,wf2] [--dry-run]
#   ./install-codex-bundle.sh --scope project --project-root /path [--dry-run]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKFLOWS_DIR="${SCRIPT_DIR}/workflows"

# ── Defaults ────────────────────────────────────────────────────────
SCOPE=""
PROJECT_ROOT=""
DRY_RUN=false
SELECTED_WORKFLOWS=""
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="${HOME}/.backup/codex-bundle-installer/${TIMESTAMP}"
INSTALLED_SKILL_COUNT=0
REGISTERED_SKILL_COUNT=0

ALL_WORKFLOWS=(
  audience-management
  content-analysis
  content-production
  content-utilities
  growth-ops
  publishing
  topic-research
  visual-content
)

# ── Parse Args ──────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --scope)      SCOPE="$2"; shift 2 ;;
    --project-root) PROJECT_ROOT="$2"; shift 2 ;;
    --workflows)  SELECTED_WORKFLOWS="$2"; shift 2 ;;
    --dry-run)    DRY_RUN=true; shift ;;
    -h|--help)
      echo "Usage: $0 --scope user|project [--project-root PATH] [--workflows wf1,wf2] [--dry-run]"
      exit 0
      ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

if [[ -z "$SCOPE" ]]; then
  echo "Error: --scope is required (user or project)"
  exit 1
fi

# ── Determine target directory ──────────────────────────────────────
if [[ "$SCOPE" == "user" ]]; then
  TARGET="${HOME}"
elif [[ "$SCOPE" == "project" ]]; then
  if [[ -z "$PROJECT_ROOT" ]]; then
    echo "Error: --project-root is required for project scope"
    exit 1
  fi
  TARGET="$PROJECT_ROOT"
else
  echo "Error: --scope must be 'user' or 'project'"
  exit 1
fi

CODEX_DIR="${TARGET}/.codex"
AGENTS_DIR="${TARGET}/.agents"
SKILLS_DIR="${AGENTS_DIR}/skills"
CONFIG_FILE="${CODEX_DIR}/config.toml"
AGENTS_MD="${TARGET}/AGENTS.md"

# ── Resolve workflow list ───────────────────────────────────────────
if [[ -n "$SELECTED_WORKFLOWS" ]]; then
  IFS=',' read -ra WORKFLOWS <<< "$SELECTED_WORKFLOWS"
else
  WORKFLOWS=("${ALL_WORKFLOWS[@]}")
fi

# ── Logging ─────────────────────────────────────────────────────────
log() { echo "[install] $*"; }
dry() { if $DRY_RUN; then echo "[dry-run] $*"; return 0; fi; return 1; }

count_optional_dirs() {
  local skill_dir="$1"
  local optional=()

  [[ -d "${skill_dir}/references" ]] && optional+=("references/")
  [[ -d "${skill_dir}/scripts" ]] && optional+=("scripts/")
  [[ -d "${skill_dir}/assets" ]] && optional+=("assets/")

  if [[ ${#optional[@]} -eq 0 ]]; then
    echo "SKILL.md"
  else
    echo "SKILL.md + ${optional[*]}"
  fi
}

copy_dir_contents() {
  local src="$1"
  local dest="$2"

  mkdir -p "$dest"
  cp -R "${src}/." "$dest/"
}

config_entry_has_enabled() {
  local path_value="$1"

  awk -v target="path = \"${path_value}\"" '
    $0 == target { in_entry = 1; next }
    in_entry && /^enabled[[:space:]]*=/ { found = 1; exit }
    in_entry && ($0 == "" || /^\[\[skills\.config\]\]$/) { exit }
    END { exit(found ? 0 : 1) }
  ' "$CONFIG_FILE"
}

normalize_config_entry() {
  local expected_path="$1"
  local legacy_path_a="$2"
  local legacy_path_b="$3"
  local expected_file_path="${expected_path}/SKILL.md"
  local legacy_file_path_a="${legacy_path_a}/SKILL.md"
  local legacy_file_path_b="${legacy_path_b}/SKILL.md"
  local tmp_file

  tmp_file="$(mktemp)"

  if awk \
    -v expected="path = \"${expected_path}\"" \
    -v expected_file="path = \"${expected_file_path}\"" \
    -v legacy_a="path = \"${legacy_path_a}\"" \
    -v legacy_file_a="path = \"${legacy_file_path_a}\"" \
    -v legacy_b="path = \"${legacy_path_b}\"" \
    -v legacy_file_b="path = \"${legacy_file_path_b}\"" \
    '
      function is_target(line) {
        return (
          line == expected ||
          line == expected_file ||
          line == legacy_a ||
          line == legacy_file_a ||
          line == legacy_b ||
          line == legacy_file_b
        )
      }

      function flush_enabled() {
        if (pending_enabled) {
          print "enabled = true"
          pending_enabled = 0
        }
      }

      {
        if (is_target($0)) {
          flush_enabled()
          if (!seen_target) {
            print expected
            pending_enabled = 1
            seen_target = 1
          }
          found = 1
          next
        }

        if (pending_enabled) {
          if ($0 ~ /^enabled[[:space:]]*=/) {
            print "enabled = true"
            pending_enabled = 0
            next
          }

          print "enabled = true"
          pending_enabled = 0
        }

        print $0
      }

      END {
        flush_enabled()
        exit(found ? 0 : 1)
      }
    ' "$CONFIG_FILE" > "$tmp_file"; then
    mv "$tmp_file" "$CONFIG_FILE"
    return 0
  fi

  rm -f "$tmp_file"
  return 1
}

ensure_skills_enabled_block() {
  if grep -Eq '^\[skills\]$' "$CONFIG_FILE" 2>/dev/null; then
    return 0
  fi

  local tmp_file
  tmp_file="$(mktemp)"

  {
    cat "$CONFIG_FILE"
    printf '\n[skills]\nenabled = true\n'
  } > "$tmp_file"

  mv "$tmp_file" "$CONFIG_FILE"
}

write_managed_config() {
  cat > "$CONFIG_FILE" << 'HEADER'
# Codex CLI Configuration
# Auto-generated by install-codex-bundle.sh

[skills]
enabled = true

HEADER

  for wf in "${WORKFLOWS[@]}"; do
    local src_skills="${WORKFLOWS_DIR}/${wf}/skills"
    [[ ! -d "$src_skills" ]] && continue

    for skill_dir in "${src_skills}"/*/; do
      local skill_name
      skill_name="$(basename "$skill_dir")"

      cat >> "$CONFIG_FILE" << EOF
[[skills.config]]
path = "../.agents/skills/${skill_name}"
enabled = true

EOF
      REGISTERED_SKILL_COUNT=$((REGISTERED_SKILL_COUNT + 1))
      log "Registered skill: ${skill_name}"
    done
  done
}

# ── Backup existing files ──────────────────────────────────────────
backup_if_exists() {
  local path="$1"
  if [[ -e "$path" ]]; then
    local rel="${path#$TARGET/}"
    local backup_path="${BACKUP_DIR}/${rel}"
    if ! dry "Would backup: $path -> $backup_path"; then
      mkdir -p "$(dirname "$backup_path")"
      cp -r "$path" "$backup_path"
      log "Backed up: $path"
    fi
  fi
}

# ── Install skills ─────────────────────────────────────────────────
install_skills() {
  local wf="$1"
  local src_workflow="${WORKFLOWS_DIR}/${wf}"
  local src_skills="${src_workflow}/skills"

  if [[ ! -d "$src_workflow" ]]; then
    log "Warning: No workflow directory for '${wf}', skipping"
    return
  fi

  for skill_dir in "${src_skills}"/*/; do
    local skill_name
    skill_name="$(basename "$skill_dir")"
    local dest="${SKILLS_DIR}/${skill_name}"
    local copied_summary
    copied_summary="$(count_optional_dirs "$skill_dir")"

    if dry "Would install skill: ${skill_name} -> ${dest} (${copied_summary})"; then
      continue
    fi

    backup_if_exists "$dest"
    copy_dir_contents "$skill_dir" "$dest"
    INSTALLED_SKILL_COUNT=$((INSTALLED_SKILL_COUNT + 1))
    log "Installed skill: ${skill_name} -> ${dest} (${copied_summary})"
  done
}

# ── Install config.toml entries ────────────────────────────────────
install_config() {
  if ! dry "Would update config: ${CONFIG_FILE}"; then
    mkdir -p "$CODEX_DIR"
    backup_if_exists "$CONFIG_FILE"

    if [[ ! -f "$CONFIG_FILE" ]] || grep -Fq "# Auto-generated by install-codex-bundle.sh" "$CONFIG_FILE"; then
      write_managed_config
      return
    fi

    ensure_skills_enabled_block

    for wf in "${WORKFLOWS[@]}"; do
      local src_skills="${WORKFLOWS_DIR}/${wf}/skills"
      [[ ! -d "$src_skills" ]] && continue

      for skill_dir in "${src_skills}"/*/; do
        local skill_name
        skill_name="$(basename "$skill_dir")"
        local installed_path="../.agents/skills/${skill_name}"

        if config_entry_has_enabled "$installed_path"; then
          log "Already registered: ${skill_name}"
        else
          cat >> "$CONFIG_FILE" << EOF

[[skills.config]]
path = "${installed_path}"
enabled = true
EOF
          REGISTERED_SKILL_COUNT=$((REGISTERED_SKILL_COUNT + 1))
          log "Registered skill: ${skill_name}"
        fi
      done
    done
  else
    for wf in "${WORKFLOWS[@]}"; do
      local src_skills="${WORKFLOWS_DIR}/${wf}/skills"
      [[ ! -d "$src_skills" ]] && continue
      for skill_dir in "${src_skills}"/*/; do
        echo "[dry-run] Would register: $(basename "$skill_dir")"
      done
    done
  fi
}

# ── Install AGENTS.md ──────────────────────────────────────────────
install_agents_md() {
  local src_agents_md="${SCRIPT_DIR}/AGENTS.md"

  if [[ ! -f "$src_agents_md" ]]; then
    log "Warning: No AGENTS.md in bundle, skipping"
    return
  fi

  local marker="# -- AI Content Plugins (Codex CLI) --"

  if dry "Would update AGENTS.md at ${AGENTS_MD}"; then
    return
  fi

  backup_if_exists "$AGENTS_MD"

  if [[ -f "$AGENTS_MD" ]] && grep -q "$marker" "$AGENTS_MD" 2>/dev/null; then
    log "AGENTS.md already contains AI Content Plugins section, skipping"
  else
    {
      echo ""
      echo "$marker"
      echo ""
      cat "$src_agents_md"
      echo ""
      echo "# -- End AI Content Plugins --"
    } >> "$AGENTS_MD"
    log "Appended rules to AGENTS.md"
  fi
}

# ── Main ────────────────────────────────────────────────────────────
echo "============================================"
echo "  AI Content Plugins — Codex CLI Installer"
echo "============================================"
echo "  Scope:      ${SCOPE}"
echo "  Target:     ${TARGET}"
echo "  Workflows:  ${WORKFLOWS[*]}"
echo "  Dry-run:    ${DRY_RUN}"
echo "  Backup:     ${BACKUP_DIR}"
echo "============================================"
echo ""

if $DRY_RUN; then
  log "DRY RUN MODE — no files will be modified"
  echo ""
fi

for wf in "${WORKFLOWS[@]}"; do
  if [[ ! -d "${WORKFLOWS_DIR}/${wf}" ]]; then
    log "Error: Workflow '${wf}' not found in ${WORKFLOWS_DIR}"
    continue
  fi
  log "Processing workflow: ${wf}"
  install_skills "$wf"
done

install_config
install_agents_md

echo ""
log "Done! Installed ${#WORKFLOWS[@]} workflow(s), ${INSTALLED_SKILL_COUNT} skill directory/directories, registered ${REGISTERED_SKILL_COUNT} new config entrie(s)."
if $DRY_RUN; then
  log "This was a dry run. Re-run without --dry-run to apply changes."
fi
