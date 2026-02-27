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

# --- Step 2: Create news-search symlinks ---
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

# --- Step 3: Install npm dependencies ---
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
echo "Point Claude Code / OpenClaw to any workspace-* directory to activate an agent."
