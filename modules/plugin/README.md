![Logo](https://raw.githubusercontent.com/neoskop/pulumi-buddy/master/logo.svg?sanitize=true)

[![Travis master](https://img.shields.io/travis/neoskop/pulumi-buddy/master.svg)](https://travis-ci.org/neoskop/pulumi-buddy)
[![Snyk master](https://snyk.io/test/github/neoskop/pulumi-buddy/master/badge.svg)](https://snyk.io/test/github/neoskop/pulumi-buddy/master)
[![License](https://img.shields.io/npm/l/pulumi-buddy.svg)](https://github.com/neoskop/pulumi-buddy/blob/master/LICENSE)

> A [Pulumi](https://www.pulumi.com/) integration for [Buddy](https://buddy.works/)

## Usage

See [NodeJS SDK](../../sdk/nodejs) for usage description.

## Development

### Project Structure

See [Workspace README](../..#project-structure) for project setup.

Run `yarn build` or `yarn watch` for building respectively building on every file change.
Use `yarn install-plugin` to link the local build plugin into the pulumi plugin directory.

### Codegen

Use `yarn generate:buddy-actions` to generate all actions with the scraped informations for the [Buddy Docs](https://buddy.works/docs/api/pipelines/create-manage-actions/add-action).

### Publishing

Run `yarn bundle` to build, bundle the current version.
Run `yarn bundle-and-publish` to build, bundle and publish the current version (Requires write access to the `gs://pulumi.neoskop.cloud` bucket).

## License

[MIT](https://raw.githubusercontent.com/neoskop/pulumi-buddy/master/LICENSE)
