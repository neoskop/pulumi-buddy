#!/bin/bash

set -e

if [[ -s "$0" ]]; then
    BINDIR=$(cd $(dirname $(readlink -f $0)) && pwd);
else
    BINDIR=$(cd `dirname $0` && pwd);
fi
BASEDIR=$(dirname $BINDIR)

cd $BASEDIR/dist;

trap 'kill $(jobs -p)' EXIT

node --unhandled-rejections=strict main "$@"