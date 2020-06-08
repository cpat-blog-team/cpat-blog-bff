#!/usr/bin/env bash
set -e

cleanup() {
    `(docker-compose -f docker-compose.dev.yml down)` > /dev/null 2>&1
    trap '' EXIT INT TERM
    exit $err
}	

trap cleanup SIGINT EXIT

docker-compose -f docker-compose.dev.yml up -d --force-recreate --remove-orphans
echo "loading database ..."
sleep 3
echo "loading webserver ..."
sleep 10
echo "loading tests ..."
jest --runInBand --coverage
docker-compose -f docker-compose.dev.yml down