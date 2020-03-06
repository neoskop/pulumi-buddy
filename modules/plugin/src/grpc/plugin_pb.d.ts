// package: pulumirpc
// file: plugin.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class PluginInfo extends jspb.Message { 
    getVersion(): string;
    setVersion(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PluginInfo.AsObject;
    static toObject(includeInstance: boolean, msg: PluginInfo): PluginInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PluginInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PluginInfo;
    static deserializeBinaryFromReader(message: PluginInfo, reader: jspb.BinaryReader): PluginInfo;
}

export namespace PluginInfo {
    export type AsObject = {
        version: string,
    }
}

export class PluginDependency extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getKind(): string;
    setKind(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;

    getServer(): string;
    setServer(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PluginDependency.AsObject;
    static toObject(includeInstance: boolean, msg: PluginDependency): PluginDependency.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PluginDependency, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PluginDependency;
    static deserializeBinaryFromReader(message: PluginDependency, reader: jspb.BinaryReader): PluginDependency;
}

export namespace PluginDependency {
    export type AsObject = {
        name: string,
        kind: string,
        version: string,
        server: string,
    }
}
