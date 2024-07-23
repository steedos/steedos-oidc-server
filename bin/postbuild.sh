#!/bin/bash

rm -rf ./.amplify-hosting

mkdir -p ./.amplify-hosting/compute

cp -r ./adapters ./.amplify-hosting/compute/default
cp -r ./routes ./.amplify-hosting/compute/default
cp -r ./node_modules ./.amplify-hosting/compute/default
cp -r ./utils ./.amplify-hosting/compute/default
cp -r ./views ./.amplify-hosting/compute/default
cp -r ./support ./.amplify-hosting/compute/default
cp ./.env ./.amplify-hosting/compute/default
cp ./index.js ./.amplify-hosting/compute/default
cp ./package.json ./.amplify-hosting/compute/default
cp ./yarn.lock ./.amplify-hosting/compute/default

cp -r public ./.amplify-hosting/static

cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json