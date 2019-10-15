## boilerplate-ng-static

## Quick Setup
* Install dependencies: `npm install`.
* Run the project locally by running `npm run dev`.

## Build tasks
* `npm run build` to prepare a distributable bundle.

## Development
* Run `npm run server` to run the local dev server that serves the data.
* Run `npm run dev` to run in HMR-mode using webpack-dev-server.

## Creating movies
In order to add or remove movies from the local database do the following:
* Go to `/backend`
* Enter the ID of a movie on IMDb. The ID of a movie can be found in the URL. I.e. `https://www.imdb.com/title/tt7286456/`, the ID is `tt7286456`.


## Linting

Lint your code! Install [`SublimeLinter-eslint`](https://github.com/roadhump/SublimeLinter-eslint) or [`eslint for intellij`](https://plugins.jetbrains.com/plugin/7494) and get linting right in your editor.

You can also run the linter in a terminal by running the lint script: `npm run lint`.

## Deployment

**Production**

Builds docker image on teamcity on push to `master` using config in `.umploy.json`

Production is deployed to [boilerplate-ng-static.prod.umw.dk](https://boilerplate-ng-static.prod.umw.dk/).
