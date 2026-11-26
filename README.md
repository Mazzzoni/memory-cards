# Memory Cards

Simple game about memory and cards.  
Main goal of the project is to show how to build a simple lobby based online multiplayer game. Logic can apply for app lobby based too.

You can find released game here:  
[https://memory-cards.mazz.lol/](https://memory-cards.mazz.lol/)

Here's a complete article about process and implementation:  
[https://francois-steinel.fr/articles/build-lobby-based-online-multiplayer-browser-games-with-react-and-nodejs](https://francois-steinel.fr/articles/build-lobby-based-online-multiplayer-browser-games-with-react-and-nodejs)

## Installation

To install project locally, make sure to have NodeJS (version 16.13.0 at least) and Yarn (version 1.22.17 at least) installed.

* Clone the project `git@github.com:Mazzzoni/memory-cards.git`
* Enter project `cd memory-cards/`
* Install dependencies `yarn`
* Start dev environment for client `yarn start:dev:client`
* Start dev environment for server `yarn start:dev:server`

## Stack

### Yarn Workspaces

Project makes use of Yarn `workspaces` to manage client and server projects but also to share some code between both.

### Next.js / React.js

Client application is built on top of Next.js.

### NestJS / NodeJS

Server side is built using NestJS to manage game instances and handle interactions with clients.

### Socket.IO

To handle realtime, project uses websockets and manage socket connections with Socket.IO.

### Docker

For deployment, I use docker containers (using Alpine NodeJS images for client and server).

## Operations

The server standard and the host config (Caddy site, firewall) are in
[Mazzzoni/mazz-infra](https://github.com/Mazzzoni/mazz-infra); this project's row is in its `inventory.toml`.

### Environments

| Env | Server (ssh alias) | Domain | Checkout | Branch | Compose project |
| --- | --- | --- | --- | --- | --- |
| production | `mazzvps` | memory-cards.mazz.lol | `~/projects/memory-cards.mazz.lol` | `main` | `memory-cardsmazzlol` |

Two containers: `client` (Next.js, `127.0.0.1:3876`) and `server` (NestJS + Socket.IO, `127.0.0.1:3875`, behind
`/wsapi*`). `compose.yaml` is the base; the server's `.env` adds `compose.prod.yaml` (restart policy, log
rotation) through `COMPOSE_FILE` and pins `COMPOSE_PROJECT_NAME`.

### Deploy

By hand on the server, after a push to `main`:

```bash
cd ~/projects/memory-cards.mazz.lol && git pull --ff-only && docker compose up -d --build --wait
```

### Rollback

Revert the commit on `main`, push, deploy as above.

### Server files

| Path | What | Template |
| --- | --- | --- |
| `.env` | compose: `COMPOSE_FILE`, project name, ports (no secret) | `.env.prod.dist` |
| `workspaces/client/.env.local` | the client's production values, inlined at build time | `workspaces/client/.env.local.prod.dist` |
| `workspaces/server/.env.local` | the server's allowed origin | `workspaces/server/.env.local.prod.dist` |

All in Bitwarden (Mazz/Servers) through `~/projects/server-secrets`.

### Backup and restore

Nothing to back up: no database. `workspaces/server/var` is mounted into the server and empty today.

### Logs and jobs

No cron, no worker. Logs: `docker compose logs -f server`.

## Credits

Created by [Mazzoni](https://github.com/Mazzzoni). (email: [hello@mazz.lol](mailto:hello@mazz.lol) / discord: [@mazz#0385](https://discordapp.com/users/370123066594033668))