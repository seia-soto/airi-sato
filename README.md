# airi-sato

The Discord automation base template for Airi-Sato.

> The next project of [`scriptoned`](https://github.com/Seia-Soto/scriptoned) which rewrote with Eris.JS instead of Discord.JS.

## Table of Contents

- [Questions](#questions)
- [Installation](#installation)
- [Scripts](#scripts)
- [Development](#development)

----

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

# Installation

## Requirements

To install this project, you need to install following pre-requirements and dependencies.

- `Node.JS` v10 or higher
- `NPM` (installed with `Node.JS`)
- C++ Compiler
- Python 2.7 (not version 3)

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
