#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
cd ../..
git checkout gh-pages
git pull --rebase
cp modules/plugin/bundles/*.tar.gz . 
git add pulumi-resource-buddy-*.tar.gz
git commit -m "publish binaries"
git push
git checkout $BRANCH