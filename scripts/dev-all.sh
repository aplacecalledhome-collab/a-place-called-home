#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Starting dev environment..."

# Default to local functions URL in dev, unless caller overrides
DEFAULT_FUNCS_URL="http://localhost:54321/functions/v1"

# Determine whether Supabase CLI is available
if command -v supabase >/dev/null 2>&1; then
  echo "✅ Supabase CLI found. Launching local functions..."
  # Ensure submit-contact has its own env file (already added to repo)
  supabase functions serve submit-tour --env-file supabase/functions/submit-tour/.env &
  PID_TOUR=$!
  supabase functions serve submit-contact --env-file supabase/functions/submit-contact/.env &
  PID_CONTACT=$!
  echo "submit-tour PID: $PID_TOUR, submit-contact PID: $PID_CONTACT"
  export VITE_SUPABASE_FUNCTIONS_URL="${VITE_SUPABASE_FUNCTIONS_URL:-$DEFAULT_FUNCS_URL}"
else
  echo "⚠️ Supabase CLI not found. Frontend will use deployed functions."
  # Fall back to cloud URL from .env if present; otherwise leave default remote empty
  # If you want to force remote explicitly, set VITE_SUPABASE_FUNCTIONS_URL before running.
  # Do not override if user already set an env var.
  if [[ -z "${VITE_SUPABASE_FUNCTIONS_URL:-}" ]]; then
    # Read from .env if present
    if [[ -f .env ]]; then
      REMOTE_URL=$(grep -E '^VITE_SUPABASE_FUNCTIONS_URL=' .env | sed 's/^VITE_SUPABASE_FUNCTIONS_URL=//') || true
      if [[ -n "$REMOTE_URL" ]]; then
        export VITE_SUPABASE_FUNCTIONS_URL="$REMOTE_URL"
      fi
    fi
  fi
fi

cleanup() {
  echo "\nStopping dev environment..."
  if [[ -n "${PID_TOUR:-}" ]]; then kill "$PID_TOUR" 2>/dev/null || true; fi
  if [[ -n "${PID_CONTACT:-}" ]]; then kill "$PID_CONTACT" 2>/dev/null || true; fi
}
trap cleanup EXIT INT TERM

# Start Vite dev server on port 3000
echo "Launching Vite on http://localhost:3000 ..."
npx vite

