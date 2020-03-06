#!/bin/bash

set -e

PROTO_DIR="$(pwd)/../../node_modules/@pulumi/sources/sdk/proto"

DOCKER_IMAGE_SOURCE="protobuf-builder"
DOCKER_IMAGE="protobuf-builder-local"

if ! docker images | grep -E "$DOCKER_IMAGE_SOURCE\\s"; then
    docker build -f "$PROTO_DIR/Dockerfile" -t "$DOCKER_IMAGE_SOURCE" .
fi

if ! docker images | grep -E "$DOCKER_IMAGE"; then
    docker build -t "$DOCKER_IMAGE" .
fi

DOCKER_RUN="docker run -it --rm -v $(pwd):/js -v $PROTO_DIR:/local $DOCKER_IMAGE"
PROTOC="$DOCKER_RUN protoc"
USER_ID=$(id --user)
GROUP_ID=$(id --group)

$DOCKER_RUN bash -c "set -e                                                         && \
    SRC_OUT_DIR=/js/src/grpc                                                        && \
    JS_PROTOFLAGS=\"import_style=commonjs,binary\"                                  && \
    JS_HACK_PROTOS=\$(find * -name \"*.proto\" -not -name \"status.proto\")         && \
    TEMP_DIR=/tmp/nodejs-build                                                      && \
    echo -e \"\tJS: \$SRC_OUT_DIR [\$JS_PROTOFLAGS]\"                               && \
    echo -e \"\tJS temp dir: \$TEMP_DIR\"                                           && \
    mkdir -p \$SRC_OUT_DIR                                                          && \
    mkdir -p \$TEMP_DIR                                                             && \
    grpc_tools_node_protoc --js_out=\$JS_PROTOFLAGS:\$SRC_OUT_DIR \
           --grpc_out=minimum_node_version=6:\$SRC_OUT_DIR \
           --plugin=protoc-gen-grpc=/usr/local/bin/grpc_tools_node_protoc_plugin \
           -I /npm/node_modules/google-proto-files -I /local status.proto           && \
    protoc --ts_out=\$SRC_OUT_DIR \
           --plugin=\"protoc-gen-ts=/npm/node_modules/.bin/protoc-gen-ts\" \
           -I /npm/node_modules/google-proto-files -I /local status.proto           && \
    grpc_tools_node_protoc --js_out=\$JS_PROTOFLAGS:\$TEMP_DIR \
           --grpc_out=minimum_node_version=6:\$TEMP_DIR \
           --plugin=protoc-gen-grpc=/usr/local/bin/grpc_tools_node_protoc_plugin \
           -I /npm/node_modules/google-proto-files -I /local \$JS_HACK_PROTOS       && \
    protoc --ts_out=\$SRC_OUT_DIR \
           --plugin=\"protoc-gen-ts=/npm/node_modules/.bin/protoc-gen-ts\" \
           -I /npm/node_modules/google-proto-files -I /local  \$JS_HACK_PROTOS      && \
    sed -i \"s/^var global = .*;/var proto = { pulumirpc: {} }, global = proto;/\" \"\$TEMP_DIR\"/*.js && \
    cp \"\$TEMP_DIR\"/* \"\$SRC_OUT_DIR\"                                          && \
    chown -R $USER_ID:$GROUP_ID \"\$SRC_OUT_DIR\""