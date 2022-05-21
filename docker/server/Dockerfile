FROM node:16.13.0-alpine

WORKDIR /home

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./workspaces/server ./workspaces/server

RUN yarn install

CMD ["yarn", "start:prod:server"]
