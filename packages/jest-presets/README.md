# `@eden/package-jest-presets`

This packages holds shared `jest` configuration.

We currently have the following preset available:

- `jest/jsdom`: enables `@swc/jest` for fast, DOM-based testing

## Usage

Follow these steps to add `jest` support to a new or existing package in our monorepo:

1. Add `@eden/package-jest-presets`

   ```sh
   yarn workspace @eden/<package> add -D @eden/package-jest-presets@*
   ```

1. Create `jest.config.ts` with the `@eden/package-jest-presets/jest/jsdom` preset

   ```ts
   import type { Config } from "jest";

   const config: Config = {
     preset: "@eden/package-jest-presets/jest/jsdom",
   };

   export default config;
   ```

1. Add `test` script in `package.json`

   ```json
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```

   > **Note**
   > This step automatically includes the package in our root `test` script, since it uses `turbo` to run the `test` script of all packages in the monorepo.

## Adjusting `jest` setup

[`jest-setup.ts`](./jest/jsdom/jest-setup.ts) is the home of global test setup stuff like:

- importing `@testing-library/jest-dom`
- `jest`/`window`/`document` global mock objects
