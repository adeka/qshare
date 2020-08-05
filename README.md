## Prerequisites 

- [Yarn](https://classic.yarnpkg.com/en/) to manage dependencies: `brew install yarn`

## Setup

```bash
# switch to specified node version
nvm use

# install dependencies
yarn install

# start a local `webpack-dev-server`
yarn dev
```

## Code Standards

We use several tools to enforce code standards.

- [Prettier](https://prettier.io/docs/en/cli.html) for opinionated code formatting
- [ESlint](https://eslint.org/) with a prettier plugin for code linting, to identify code style issues and potential bugs
- [Babel](https://github.com/babel/babel) which enables writing code with the latest version of JavaScript

Prettier and ESlint work together to keep code style consistent for a group of developers working together, solving silly problems like whitespace commits an trailing commas.

Along with babel, which allows enforcing and utilizing certain modern JS code practices, these tools help programmers keep coding.
We recommend Visual Studio Code with `prettier`, `es-lint` plugins installed, we even have a vscode editor config file in the repo.

These tools paired with hot-reloading make development in js crazy fast.
