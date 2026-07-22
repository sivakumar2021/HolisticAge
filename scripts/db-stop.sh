#!/usr/bin/env bash
set -euo pipefail
pg_ctl -D "$HOME/holistic-age-pgdata/data" stop
