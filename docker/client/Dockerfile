FROM node:16.13.0-alpine

WORKDIR /home

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./workspaces/client ./workspaces/client

RUN yarn install

CMD ["yarn", "start:prod:client"]
