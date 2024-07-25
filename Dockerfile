FROM node:18-slim

RUN apt-get update || : && apt-get install -y \
    curl \
    build-essential
    
# RUN npm install -g typescript ts-node

WORKDIR /app

COPY ./public ./public
COPY ./routes ./routes
COPY ./utils ./utils
COPY ./views ./views
COPY ./support ./support
COPY ./adapters ./adapters

COPY ./.env .
COPY ./index.js .
COPY ./package.json .
COPY ./yarn.lock .


RUN yarn --production && yarn cache clean

CMD ["node", "index.js"]