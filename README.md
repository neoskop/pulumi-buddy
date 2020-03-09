![Logo](https://raw.githubusercontent.com/neoskop/pulumi-buddy/master/logo.svg?sanitize=true)

[![Travis master](https://img.shields.io/travis/neoskop/pulumi-buddy/master.svg)](https://travis-ci.org/neoskop/pulumi-buddy)
[![Snyk master](https://snyk.io/test/github/neoskop/pulumi-buddy/master/badge.svg)](https://snyk.io/test/github/neoskop/pulumi-buddy/master)
[![License](https://img.shields.io/npm/l/%40neoskop%2Fpulumi-buddy.svg)](https://github.com/neoskop/pulumi-buddy/blob/master/LICENSE)

> A [Pulumi](https://www.pulumi.com/) integration for [Buddy](https://buddy.works/)

## Project Structure

This repository is a Yarn workspace and contains two submodules which integrate with each other:

- The NodeJS SDK provides your Pulumi-based project with resources for Buddy ([README](./sdk/nodejs))
- The Plugin provides a provider for Pulumi to provision infrastructure based on the SDK's described resources ([README](./modules/plugin))

## Quickstart

Install the Plugin and all dependencies.

```
$ yarn
```

Afterwards follow the [quickstart guide](./sdk/nodejs#quickstart) of the plugin.

## License

[MIT](https://raw.githubusercontent.com/neoskop/pulumi-buddy/master/LICENSE)
