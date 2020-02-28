#!/bin/bash

HOMEDIR=$(cd ~ && pwd)
PULUMI_PLUGINS_DIR="$HOMEDIR/.pulumi/plugins";
if [[ -s "$0" ]]; then
    BINDIR=$(cd $(dirname $(readlink -f $0)) && pwd);
else
    BINDIR=$(cd `dirname $0` && pwd);
fi
BASEDIR=$(dirname $BINDIR);

NAME="buddy"
VERSION=$(node -e "console.log(require('$BASEDIR/package').version)")

PLUGIN_DIR="${PULUMI_PLUGINS_DIR}/resource-${NAME}-v${VERSION}"

if [[ ! -d "$PLUGIN_DIR" ]]; then
    mkdir $PLUGIN_DIR
fi

if [[ -f "$PLUGIN_DIR/pulumi-resource-${NAME}" ]]; then
    rm "$PLUGIN_DIR/pulumi-resource-${NAME}"
fi

ln -s "$BASEDIR/bin/pulumi-buddy-plugin.sh" "$PLUGIN_DIR/pulumi-resource-${NAME}"