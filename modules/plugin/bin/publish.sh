#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
cd ../..
git checkout gh-pages
git pull --rebase
mkdir -p pulumi-resource-neoskop
cp modules/plugin/bundles/*.tar.gz pulumi-resource-neoskop 
git add pulumi-resource-neoskop/pulumi-buddy-*.tar.gz
git commit -m "publish binaries"
git push
git checkout $BRANCH