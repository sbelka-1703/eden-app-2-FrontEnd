# Soil Turborepo

public builds of both environments can be found at:

[Webapp](https://eden-foundation2.vercel.app/)

[Storybook](https://eden-foundation-storybook.vercel.app/)

## For Development

Fork this repo.

Install packages:

```
yarn
```

To develop the front-end app and packages, run the following command:

```
yarn dev
```

To develop the storybook app and packages, run the following command:

```
yarn storybook
```

During development, you may get a lot of prettier errors when doing something like a copy and paste. To clean up prettier errors, run:

```
yarn format
```

## Making a PR

Create your own branch using `git checkout -b your_branch_name`. Remember to use a branch name that describes WHAT you're doing/fixing. Start branch name with

- feat: A new feature
- fix: A bug fix
- docs: Changes to documentation
- style: Formatting, missing semi colons, etc; no code change
- refactor: Refactoring production code
- test: Adding tests, refactoring test; no production code change
- chore: Updating build tasks, package manager configs, etc; no production code change

Before submitting your PR, be sure to test and lint for errors by running:

```
yarn test
```

and then

```
yarn lint
```

You can also test building the app and storybook locally to confirm no errors

For the front-end app, run:

```
yarn build
```

For storybook, run:

```
yarn build-storybook
```

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `storybook`: a [storybook](https://storybook.js.org/) app
- `web`: another [Next.js](https://nextjs.org) app
- `ui`: a stub React component library shared by both `web` and `storybook` applications
- `config` configurations (includes `eslint-preset-js` , `jest-preset-js` , `postcss.config.js` and `tailwind.config.js`)
- `tsconfig`: `tsconfig.json` is used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
