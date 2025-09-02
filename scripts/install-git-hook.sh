#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOK_DIR="$ROOT_DIR/.git/hooks"
HOOK_FILE="$HOOK_DIR/pre-commit"

if [[ ! -d "$HOOK_DIR" ]]; then
  echo "This does not appear to be a git repository (.git/hooks not found)." >&2
  exit 1
fi

cat > "$HOOK_FILE" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

# Run lightweight secret scan before commit
if [[ -x scripts/scan-secrets.sh ]]; then
  bash scripts/scan-secrets.sh
else
  echo "scripts/scan-secrets.sh not executable; skipping secret scan" >&2
fi
EOF

chmod +x "$HOOK_FILE"
echo "Installed pre-commit hook at .git/hooks/pre-commit"

