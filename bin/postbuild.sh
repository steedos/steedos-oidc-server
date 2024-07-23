#!/bin/bash

rm -rf ./.amplify-hosting

mkdir -p ./.amplify-hosting/compute

cp -r ./adapters ./.amplify-hosting/compute/default/adapters
cp -r ./routes ./.amplify-hosting/compute/default/routes
cp -r ./node_modules ./.amplify-hosting/compute/default/node_modules
cp -r ./support ./.amplify-hosting/compute/default/support
cp -r ./utils ./.amplify-hosting/compute/default/utils
cp -r ./views ./.amplify-hosting/compute/default/views
cp ./.env ./.amplify-hosting/compute/default/.env
cp ./configuration.json ./.amplify-hosting/compute/default/configuration.json
cp ./express.js ./.amplify-hosting/compute/default/express.js
cp ./package.json ./.amplify-hosting/compute/default/package.json
cp ./yarn.lock ./.amplify-hosting/compute/default/yarn.lock

cp -r public ./.amplify-hosting/static

cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json