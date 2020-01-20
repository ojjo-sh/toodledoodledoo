# Toodledoodledoo

(･ิL_･ิ)

A simple todolist application; the starter project to end to all starter projects.

## Setup

### Server

To run the Toodledoodledoo server, you will need PostgreSQL (we recommend using [Docker](https://hackernoon.com/dont-install-postgres-docker-pull-postgres-bee20e200198)) and the latest version of Node.js. If your local Postgres configuration differs from `server/config/default.toml`, you can maintain your own configuration file by creating a `dev.toml` in the same directory. All database connections will use `dev.toml` if present. 

To run the server, first navigate to `server/` and install the required dependencies:
```bash
$ npm i
```

Once installed, you will need to run migrations:
```bash
$ npm run migrate
```

You can finally start the dev server by running:
```bash
$ npm run dev
```
