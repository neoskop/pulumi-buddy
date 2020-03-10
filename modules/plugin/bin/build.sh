#!/bin/bash

rm -rf .build
mkdir .build

(cd ../.. && yarn --frozen-lockfile)
(cd ../../sdk/nodejs && yarn build)

yarn build
tar --exclude-from=.npmignore --exclude .build -cv . | (cd .build && tar -x)
cat package.json | jq 'del (.dependencies["@neoskop/pulumi-buddy"])' > .build/package.json
(cd .build && yarn --prod --frozen-lockfile --non-interactive)
mkdir -p .build/node_modules/@neoskop
cp -r ../../sdk/nodejs/dist .build/node_modules/@neoskop/pulumi-buddy