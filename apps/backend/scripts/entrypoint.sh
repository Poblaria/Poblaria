#!/bin/sh

if [ "$DB_MIGRATE" = "true" ]; then
  echo "Running migrations and seeding database..."
  node ace migration:run --force
  node ace db:seed
fi

node ./bin/server.js
