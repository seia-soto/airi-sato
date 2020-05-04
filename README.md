# airi-sato

The Discord automation application.

- [Invite](https://discordapp.com/api/oauth2/authorize?client_id=429913480708096000&permissions=0&scope=bot)
- [Official Discord server](https://discordapp.com/invite/vAEBXWY)

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Questions](#questions)

----

# Installation

## Requirements

To install this project, you need to install following pre-requirements and dependencies.

- `Node.JS` v10
- `NPM` (installed with `Node.JS`)
- C++ Compiler
- Python 2.7 (not version 3)
- FFMPEG

### For production

- Use `nvm` instead of `Node.JS`
- Use `yarn` instead of `NPM`
- Use `pm2` for process management

## Dependencies

Use following command to install dependency.

> This project fully support Yarn-pkg.

```sh
yarn
```

### For production

> Note that production installation doesn't include the `SQLite3` package.

```sh
yarn --prod
```

## Config

Move `config.sample.js` to `config.js` and fill out the blanks.

> This application won't create the database file if not exists, you should do manually.

# Scripts

## `yarn debug-<type>`

Allow application to log from all modules.

- ENV: DEVELOPMENT
- DEBUG: *

```sh
yarn debug-app
yarn debug-web
```

## `yarn start-<type>`

Allow application to log from `airi-sato` modules.

- ENV: PRODUCTION
- DEBUG: airi-sato*

```sh
yarn start-app
yarn start-web
```

## `yarn dev`

Launch both `app` and `web` workers.

```sh
yarn dev
```

## `yarn prod`

Start PM2 daemon with given profile (ecosystem.config.js).

```sh
yarn prod
```

# Questions

## Why Eris.JS instead of Discord.JS?

The first structure of my Discord bot was formed with Discord.JS v9.
There is no history that I used Discord.JS v9 because I was not a member of GitHub.
When I use Discord.JS v9, people said the release speed of Discord.JS too fast just-like now.
However, it worked well enough for me even for music around functions.
Now, Discord.JS releases v12 and looks totally messed up.
They created `cache` and a lot of abstract objects, but what actually they need is stabilization.
The code doesn't work as people expected, voice connection related things always crashes up since v11.6.1.
In contrast, Eris.JS has stable and less-abstracted the code.
I think I can express my application with Eris.JS more than Discord.JS.

## How to manage the version of the project?

You need to use `git` as the version management system since I pushes the update to GitHub.
Pull the repository and get the latest update via resetting your local.
