![Build Status](https://github.com/internetarchive/archiveorg-e2e-tests/actions/workflows/main.yml/badge.svg)

# End to end tests for Archive.org using Testcafe

## Running tests locally

- run: `npm i`
- run: `npm run test:all`

## Creating new tests, running locally

- run: `npm i`
- add new test file in `~/test` directory
  - currently, there are dirs: `books, music`, if your new test file does not touch either, feel free to make a new directory.
    - If you are making a new directory:
        - you probably need a new GHA workflow and/or update current ones

## Creating a GHA workflow

- add script into package.json
- add new reusable workflow file, see [reusable workflows]
- add new reusable workflow file into main job tickets

main job tickets
- main.yml
- merge.yml
- cron.yml
- pull-request.yml

reusable workflows
- music.yml
- books.yml
- check-lint-circ.yml

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
yarn run lint
```

You can lint with ESLint and Prettier individually as well
```bash
yarn run lint:eslint
```
```bash
yarn run lint:prettier
```

To automatically fix many linting errors, run
```bash
yarn run format
```

You can format using ESLint and Prettier individually as well
```bash
yarn run format:eslint
```
```bash
yarn run format:prettier
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
