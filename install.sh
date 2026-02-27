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

# --- Step 2: Symlink workspaces to ~/.openclaw/ ---
OPENCLAW_DIR="${HOME}/.openclaw"
mkdir -p "${OPENCLAW_DIR}"

WORKSPACES=("workspace-content-researcher" "workspace-content-writer" "workspace-content-operator")

for ws in "${WORKSPACES[@]}"; do
  src="${SCRIPT_DIR}/${ws}"
  dst="${OPENCLAW_DIR}/${ws}"

  if [ ! -d "$src" ]; then
    warn "Workspace ${ws} not found, skipping"
    continue
  fi

  if [ -L "$dst" ]; then
    rm "$dst"
  elif [ -d "$dst" ]; then
    warn "${dst} exists as directory, skipping (remove manually to reinstall)"
    continue
  fi

  ln -s "$src" "$dst"
  log "Linked ${ws} → ${dst}"
done

# --- Step 3: Create news-search symlinks ---
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
  log "Symlinked news-search → ${ws}/skills/news-search"
done

# --- Step 4: Install npm dependencies ---
NEWS_SEARCH_DIR="${SCRIPT_DIR}/${NEWS_SEARCH_SRC}"
if [ -f "${NEWS_SEARCH_DIR}/scripts/package.json" ]; then
  log "Installing news-search dependencies..."
  (cd "${NEWS_SEARCH_DIR}/scripts" && bun install)
else
  warn "No package.json in news-search/scripts — skipping bun install"
fi

# --- Done ---
echo ""
log "Installation complete! 3 agents registered:"
echo "  - content-researcher (research & analysis)"
echo "  - content-writer     (writing & visuals)"
echo "  - content-operator   (ops & publishing)"
echo ""
echo "Run 'bun news-search/scripts/doctor.ts --json' in any workspace to verify setup."
