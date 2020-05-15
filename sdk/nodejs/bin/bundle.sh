#!/bin/bash

cp README.md dist
cp ../../LICENSE dist
VERSION="$(jq -r '.version' package.json)"
SERVER="$(jq -r '.pulumi.server' package.json)"
INSTALL="node bin/install-pulumi-plugin.js resource buddy ${VERSION} --server ${SERVER}"
jq ".main |= \"index.js\" | del(.scripts) | .scripts.install |= \"$INSTALL\" | ." package.json > dist/package.json
mkdir dist/bin
cp bin/install-pulumi-plugin.js dist/bin