#!/usr/bin/env bash
docker-compose -f docker-compose.dev.yml up -d --force-recreate --remove-orphans
echo "loading database ..."
sleep 3
echo "loading webserver ..."
sleep 5
echo "loading tests ..."
jest --runInBand --coverage
docker-compose -f docker-compose.dev.yml down