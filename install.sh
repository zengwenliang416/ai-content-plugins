#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[+]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[x]${NC} $1" >&2; }

# --- Step 1: Check bun ---
if ! command -v bun &>/dev/null; then
  err "bun is required but not found."
  echo "  Install: curl -fsSL https://bun.sh/install | bash"
  exit 1
fi
log "bun $(bun --version) found"

# --- Step 1b: Check Python dependencies ---
# news-search RSS parsing requires feedparser. Install for ALL Python versions
# to handle OpenClaw gateway potentially using system Python.
PYTHON_BINS=()
command -v python3 &>/dev/null && PYTHON_BINS+=("python3")
[ -x /usr/bin/python3 ] && PYTHON_BINS+=("/usr/bin/python3")
[ -x /opt/homebrew/bin/python3 ] && PYTHON_BINS+=("/opt/homebrew/bin/python3")

for py in "${PYTHON_BINS[@]}"; do
  if ! "$py" -c "import feedparser" 2>/dev/null; then
    "$py" -m pip install --user feedparser 2>/dev/null \
      || "$py" -m pip install feedparser 2>/dev/null \
      || warn "Could not install feedparser for $py"
  fi
done
log "Python feedparser dependency checked"

# --- Step 2: Register agents in OpenClaw ---
if command -v openclaw &>/dev/null; then
  log "Registering agents in OpenClaw..."

  AGENT_IDS=()
  for ws in "workspace-content-researcher" "workspace-content-writer" "workspace-content-operator"; do
    agent_id="${ws#workspace-}"  # strip prefix → content-researcher etc.
    ws_abs="${SCRIPT_DIR}/${ws}"

    if openclaw agents list --json 2>/dev/null | grep -q "\"${agent_id}\""; then
      warn "Agent ${agent_id} already registered, skipping"
    else
      openclaw agents add "${agent_id}" \
        --workspace "${ws_abs}" \
        --non-interactive 2>/dev/null \
        && log "Registered agent: ${agent_id}" \
        || warn "Failed to register ${agent_id} (may need manual setup)"
    fi
    AGENT_IDS+=("${agent_id}")
  done

  # Allow main agent to spawn all content agents
  ALLOW_JSON="[$(printf '"%s",' "${AGENT_IDS[@]}" | sed 's/,$//')]"
  openclaw config set agents.list.0.subagents.allowAgents "${ALLOW_JSON}" 2>/dev/null \
    && log "Configured main agent → can spawn: ${AGENT_IDS[*]}" \
    || warn "Could not set subagents.allowAgents (set manually if needed)"

  # Restart gateway to pick up changes
  if openclaw health &>/dev/null; then
    openclaw gateway stop 2>/dev/null
    sleep 2
    openclaw gateway install 2>/dev/null \
      && log "Gateway restarted with new config" \
      || warn "Gateway restart failed — run 'openclaw gateway install' manually"
  fi
else
  warn "openclaw CLI not found — skipping agent registration"
  echo "  Install: npm i -g openclaw"
  echo "  Then re-run this script, or register agents manually."
fi

# --- Step 3: Create news-search symlinks ---
# news-search is shared across all 3 agents. The canonical copy lives in
# workspace-content-researcher. Writer and operator get symlinks.
NEWS_SEARCH_SRC="workspace-content-researcher/skills/news-search"

for ws in "workspace-content-writer" "workspace-content-operator"; do
  link="${SCRIPT_DIR}/${ws}/skills/news-search"

  if [ -L "$link" ]; then
    rm "$link"
  fi

  if [ -d "$link" ]; then
    warn "${link} exists as directory, skipping news-search symlink"
    continue
  fi

  ln -s "../../${NEWS_SEARCH_SRC}" "$link"
  log "Symlinked news-search → ${ws}/skills/"
done

# --- Step 4: Install npm dependencies ---
# Find all package.json in skills/*/scripts/ and install
INSTALLED=0
for pkg in "${SCRIPT_DIR}"/workspace-*/skills/*/scripts/package.json; do
  [ -f "$pkg" ] || continue
  pkg_dir="$(dirname "$pkg")"
  skill_name="$(basename "$(dirname "$pkg_dir")")"
  log "Installing dependencies for ${skill_name}..."
  (cd "$pkg_dir" && bun install --frozen-lockfile 2>/dev/null || bun install)
  INSTALLED=$((INSTALLED + 1))
done

if [ "$INSTALLED" -eq 0 ]; then
  warn "No package.json found in any skill — skipping dependency install"
else
  log "Installed dependencies for ${INSTALLED} skills"
fi

# --- Done ---
echo ""
log "Setup complete! 3 agents ready:"
echo "  - content-researcher  (research & analysis)  — 18 skills"
echo "  - content-writer      (writing & visuals)    — 16 skills"
echo "  - content-operator    (ops & publishing)     — 22 skills"
echo ""
if command -v openclaw &>/dev/null; then
  echo "OpenClaw: agents registered, main can spawn sub-agents."
  echo "  Test: ask main agent to research or write — it will route automatically."
else
  echo "Point Claude Code / OpenClaw to any workspace-* directory to activate an agent."
fi
