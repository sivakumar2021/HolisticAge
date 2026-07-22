#!/usr/bin/env bash
# Starts the local Postgres cluster used for dev. Data lives OUTSIDE the
# project tree (~/holistic-age-pgdata) so Next.js/Turbopack's file watcher
# never tries to read the cluster's unix socket file as a source file.
set -euo pipefail

PGSOCK="$HOME/holistic-age-pgdata"
PGDIR="$PGSOCK/data"

if [ ! -d "$PGDIR" ]; then
  echo "Initializing Postgres data directory..."
  mkdir -p "$PGSOCK"
  initdb -D "$PGDIR" -U postgres --auth=trust --no-locale -E UTF8
fi

# LC_ALL=C / OBJC_DISABLE_INITIALIZE_FORK_SAFETY work around a known macOS
# "postmaster became multithreaded during startup" failure with Homebrew Postgres.
export LC_ALL=C
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES

pg_ctl -D "$PGDIR" -o "-p 5433 -k $PGSOCK -c listen_addresses=localhost" -l "$PGSOCK/logfile" start
pg_isready -p 5433 -h localhost

if ! psql -p 5433 -h localhost -U postgres -lqt | cut -d '|' -f 1 | grep -qw holistic_age; then
  createdb -p 5433 -h localhost -U postgres holistic_age
  echo "Created database holistic_age"
fi
