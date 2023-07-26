# fratch-ui

React UI kit where each component can be used as an stand-alone module.

[![NPM Publish](https://github.com/JorgeRojo/fratch-ui/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/JorgeRojo/fratch-ui/actions/workflows/npm-publish.yml) [![Artifact pages](https://github.com/JorgeRojo/fratch-ui/actions/workflows/artifact-pages.yml/badge.svg)](https://github.com/JorgeRojo/fratch-ui/actions/workflows/artifact-pages.yml) [![Coverage](https://github.com/JorgeRojo/fratch-ui/actions/workflows/coverage.yml/badge.svg)](https://github.com/JorgeRojo/fratch-ui/actions/workflows/coverage.yml)

[![Coverage](https://img.shields.io/badge/-Coverage-86b91a?style=for-the-badge&logo=vitest&logoColor=fff089)](https://jorgerojo.github.io/fratch-ui/coverage/) [![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://jorgerojo.github.io/fratch-ui/storybook/) [![npm](https://img.shields.io/badge/-npm-c12127?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/fratch-ui)

---

### yarn scripts

##### linters

- `yarn format` uses prettier to format the code
- `yarn lint` applies eslint rules

##### build and development

- `yarn start`
  starts the development server

- `yarn build`
  builds the components library

- `yarn storybook:build`
  builds the storybook

- `yarn storybook:preview`
  starts the preview server with the built storybook

##### publishing

- `dist:files`
  copies the files to the dist folder

- `dist:publish`
  publishes the dist folder to npm

- `dist`
  runs `dist:files`, create the npm package and `dist:publish`

- `set-version-patch`
  Applies a patch version to the package.json and crate a git commit

- `set-version-minor`
  Applies a minor version to the package.json and crate a git commit

- `set-version-major`
  Applies a minor version to the package.json and crate a git commit

##### testing

- `yarn test`
  runs the tests
- `yarn test:cover`
  runs the tests and generates a coverage report
