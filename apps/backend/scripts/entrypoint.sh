#!/usr/bin/env sh

if [ -n "$DB_MIGRATE" ]; then
  echo "Running migrations and seeding database..."
  node ace migration:run --force
  node ace db:seed
fi

node ./bin/server.js
