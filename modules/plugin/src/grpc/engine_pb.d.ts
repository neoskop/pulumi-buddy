// package: pulumirpc
// file: engine.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class LogRequest extends jspb.Message { 
    getSeverity(): LogSeverity;
    setSeverity(value: LogSeverity): void;

    getMessage(): string;
    setMessage(value: string): void;

    getUrn(): string;
    setUrn(value: string): void;

    getStreamid(): number;
    setStreamid(value: number): void;

    getEphemeral(): boolean;
    setEphemeral(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LogRequest): LogRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogRequest;
    static deserializeBinaryFromReader(message: LogRequest, reader: jspb.BinaryReader): LogRequest;
}

export namespace LogRequest {
    export type AsObject = {
        severity: LogSeverity,
        message: string,
        urn: string,
        streamid: number,
        ephemeral: boolean,
    }
}

export class GetRootResourceRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRootResourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetRootResourceRequest): GetRootResourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRootResourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRootResourceRequest;
    static deserializeBinaryFromReader(message: GetRootResourceRequest, reader: jspb.BinaryReader): GetRootResourceRequest;
}

export namespace GetRootResourceRequest {
    export type AsObject = {
    }
}

export class GetRootResourceResponse extends jspb.Message { 
    getUrn(): string;
    setUrn(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRootResourceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetRootResourceResponse): GetRootResourceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRootResourceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRootResourceResponse;
    static deserializeBinaryFromReader(message: GetRootResourceResponse, reader: jspb.BinaryReader): GetRootResourceResponse;
}

export namespace GetRootResourceResponse {
    export type AsObject = {
        urn: string,
    }
}

export class SetRootResourceRequest extends jspb.Message { 
    getUrn(): string;
    setUrn(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetRootResourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetRootResourceRequest): SetRootResourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetRootResourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetRootResourceRequest;
    static deserializeBinaryFromReader(message: SetRootResourceRequest, reader: jspb.BinaryReader): SetRootResourceRequest;
}

export namespace SetRootResourceRequest {
    export type AsObject = {
        urn: string,
    }
}

export class SetRootResourceResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetRootResourceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SetRootResourceResponse): SetRootResourceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetRootResourceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetRootResourceResponse;
    static deserializeBinaryFromReader(message: SetRootResourceResponse, reader: jspb.BinaryReader): SetRootResourceResponse;
}

export namespace SetRootResourceResponse {
    export type AsObject = {
    }
}

export enum LogSeverity {
    DEBUG = 0,
    INFO = 1,
    WARNING = 2,
    ERROR = 3,
}
