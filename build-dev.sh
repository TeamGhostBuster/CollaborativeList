#!/bin/bash

# Init empty cache file
if [ ! -f .yarn-cache.tgz ]; then
  echo "Init empty .yarn-cache.tgz"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

# Build docker container
docker build --build-arg GOOGLE_CLIENT_ID=224926533228-4jcfs0862eib0vo9j81b9d6h8agqh30f.apps.googleusercontent.com -t raspberry-dev .

docker run --rm --entrypoint cat raspberry-dev:latest /tmp/yarn.lock > /tmp/yarn.lock

if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "Saving Yarn cache"
  docker run --rm --entrypoint tar raspberry-dev:latest czf - /root/.yarn-cache/ > .yarn-cache.tgz
  echo "Saving yarn.lock"
  cp /tmp/yarn.lock yarn.lock
fi

docker-compose -f docker-compose.dev.yml up -d
