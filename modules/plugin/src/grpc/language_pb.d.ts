// package: pulumirpc
// file: language.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as plugin_pb from "./plugin_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class GetRequiredPluginsRequest extends jspb.Message { 
    getProject(): string;
    setProject(value: string): void;

    getPwd(): string;
    setPwd(value: string): void;

    getProgram(): string;
    setProgram(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRequiredPluginsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetRequiredPluginsRequest): GetRequiredPluginsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRequiredPluginsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRequiredPluginsRequest;
    static deserializeBinaryFromReader(message: GetRequiredPluginsRequest, reader: jspb.BinaryReader): GetRequiredPluginsRequest;
}

export namespace GetRequiredPluginsRequest {
    export type AsObject = {
        project: string,
        pwd: string,
        program: string,
    }
}

export class GetRequiredPluginsResponse extends jspb.Message { 
    clearPluginsList(): void;
    getPluginsList(): Array<plugin_pb.PluginDependency>;
    setPluginsList(value: Array<plugin_pb.PluginDependency>): void;
    addPlugins(value?: plugin_pb.PluginDependency, index?: number): plugin_pb.PluginDependency;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRequiredPluginsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetRequiredPluginsResponse): GetRequiredPluginsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRequiredPluginsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRequiredPluginsResponse;
    static deserializeBinaryFromReader(message: GetRequiredPluginsResponse, reader: jspb.BinaryReader): GetRequiredPluginsResponse;
}

export namespace GetRequiredPluginsResponse {
    export type AsObject = {
        pluginsList: Array<plugin_pb.PluginDependency.AsObject>,
    }
}

export class RunRequest extends jspb.Message { 
    getProject(): string;
    setProject(value: string): void;

    getStack(): string;
    setStack(value: string): void;

    getPwd(): string;
    setPwd(value: string): void;

    getProgram(): string;
    setProgram(value: string): void;

    clearArgsList(): void;
    getArgsList(): Array<string>;
    setArgsList(value: Array<string>): void;
    addArgs(value: string, index?: number): string;


    getConfigMap(): jspb.Map<string, string>;
    clearConfigMap(): void;

    getDryrun(): boolean;
    setDryrun(value: boolean): void;

    getParallel(): number;
    setParallel(value: number): void;

    getMonitorAddress(): string;
    setMonitorAddress(value: string): void;

    getQuerymode(): boolean;
    setQuerymode(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RunRequest): RunRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunRequest;
    static deserializeBinaryFromReader(message: RunRequest, reader: jspb.BinaryReader): RunRequest;
}

export namespace RunRequest {
    export type AsObject = {
        project: string,
        stack: string,
        pwd: string,
        program: string,
        argsList: Array<string>,

        configMap: Array<[string, string]>,
        dryrun: boolean,
        parallel: number,
        monitorAddress: string,
        querymode: boolean,
    }
}

export class RunResponse extends jspb.Message { 
    getError(): string;
    setError(value: string): void;

    getBail(): boolean;
    setBail(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RunResponse): RunResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunResponse;
    static deserializeBinaryFromReader(message: RunResponse, reader: jspb.BinaryReader): RunResponse;
}

export namespace RunResponse {
    export type AsObject = {
        error: string,
        bail: boolean,
    }
}
