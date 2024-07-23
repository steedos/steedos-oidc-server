export SERVER_VERSION=0.0.1

echo "#########################################################################"
echo "steedos oidc server version: ${SERVER_VERSION}"
echo "#########################################################################"

sudo docker-compose build --no-cache \
    --build-arg ARCH=amd64 \
    --build-arg NODE_VERSION=18 \
    --build-arg OS=alpine3.12 \
    --build-arg BUILD_DATE="$(date +"%Y-%m-%dT%H:%M:%SZ")"

docker tag steedos/steedos-oidc-server:latest steedos/steedos-oidc-server:${SERVER_VERSION}