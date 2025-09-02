#!/usr/bin/env bash
set -euo pipefail

# Basic, fast secret scan using ripgrep.
# Exits non‑zero if likely secrets are found.

RED="\033[31m"; GREEN="\033[32m"; YELLOW="\033[33m"; NC="\033[0m"

if ! command -v rg >/dev/null 2>&1; then
  echo -e "${YELLOW}ripgrep (rg) not found. Install it for best results.${NC}" >&2
  exit 0
fi

echo -e "${GREEN}Scanning repository for high‑risk secrets...${NC}"

exclude=(
  "--hidden"
  "--glob=!node_modules/**"
  "--glob=!build/**"
  "--glob=!.git/**"
  "--glob=!dist/**"
  "--glob=!cypress/videos/**"
  "--glob=!cypress/screenshots/**"
)

# Patterns (add more as needed)
patterns=(
  # JWT / base64 header
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  # Generic private key headers
  "-----BEGIN (RSA|DSA|EC|PRIVATE) KEY-----"
  # Supabase service role key hints
  "SERVICE_ROLE_KEY=\w+"
  # OAuth client secrets / refresh tokens
  "GMAIL_CLIENT_SECRET=\w+"
  "GMAIL_REFRESH_TOKEN=\w+"
  # Common cloud token prefixes (heuristics)
  "AKIA[0-9A-Z]{16}"
  "xox[baprs]-[0-9a-zA-Z-]+" # Slack tokens
)

found=0
for p in "${patterns[@]}"; do
  if rg -n -S ${exclude[@]} --pcre2 "$p" . >/tmp/scan-hit.$$ 2>/dev/null; then
    echo -e "${RED}Potential secret matches for pattern:${NC} $p"
    cat /tmp/scan-hit.$$ | sed 's/^/  /'
    echo
    found=1
  fi
done

rm -f /tmp/scan-hit.$$ || true

if [[ $found -ne 0 ]]; then
  echo -e "${RED}Secret scan failed. Remove or replace real secrets with placeholders before committing.${NC}" >&2
  exit 2
fi

echo -e "${GREEN}No high‑risk secrets found.${NC}"

