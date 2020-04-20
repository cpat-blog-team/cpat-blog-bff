#!/usr/bin/env bash

set -e

#This silences the terminal while the docker is being pulled down
cleanup() {
    docker_compose_pid > /dev/null 2>&1
    trap '' EXIT INT TERM
    exit $err
}	

docker-compose -f docker-compose.dev.yml up --force-recreate --remove-orphans
docker_compose_pid=$!
