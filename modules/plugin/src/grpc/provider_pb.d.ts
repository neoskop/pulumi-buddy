// package: pulumirpc
// file: provider.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as plugin_pb from "./plugin_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class ConfigureRequest extends jspb.Message { 

    getVariablesMap(): jspb.Map<string, string>;
    clearVariablesMap(): void;


    hasArgs(): boolean;
    clearArgs(): void;
    getArgs(): google_protobuf_struct_pb.Struct | undefined;
    setArgs(value?: google_protobuf_struct_pb.Struct): void;

    getAcceptsecrets(): boolean;
    setAcceptsecrets(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConfigureRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ConfigureRequest): ConfigureRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConfigureRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConfigureRequest;
    static deserializeBinaryFromReader(message: ConfigureRequest, reader: jspb.BinaryReader): ConfigureRequest;
}

export namespace ConfigureRequest {
    export type AsObject = {

        variablesMap: Array<[string, string]>,
        args?: google_protobuf_struct_pb.Struct.AsObject,
        acceptsecrets: boolean,
    }
}

export class ConfigureResponse extends jspb.Message { 
    getAcceptsecrets(): boolean;
    setAcceptsecrets(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConfigureResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ConfigureResponse): ConfigureResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConfigureResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConfigureResponse;
    static deserializeBinaryFromReader(message: ConfigureResponse, reader: jspb.BinaryReader): ConfigureResponse;
}

export namespace ConfigureResponse {
    export type AsObject = {
        acceptsecrets: boolean,
    }
}

export class ConfigureErrorMissingKeys extends jspb.Message { 
    clearMissingkeysList(): void;
    getMissingkeysList(): Array<ConfigureErrorMissingKeys.MissingKey>;
    setMissingkeysList(value: Array<ConfigureErrorMissingKeys.MissingKey>): void;
    addMissingkeys(value?: ConfigureErrorMissingKeys.MissingKey, index?: number): ConfigureErrorMissingKeys.MissingKey;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConfigureErrorMissingKeys.AsObject;
    static toObject(includeInstance: boolean, msg: ConfigureErrorMissingKeys): ConfigureErrorMissingKeys.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConfigureErrorMissingKeys, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConfigureErrorMissingKeys;
    static deserializeBinaryFromReader(message: ConfigureErrorMissingKeys, reader: jspb.BinaryReader): ConfigureErrorMissingKeys;
}

export namespace ConfigureErrorMissingKeys {
    export type AsObject = {
        missingkeysList: Array<ConfigureErrorMissingKeys.MissingKey.AsObject>,
    }


    export class MissingKey extends jspb.Message { 
        getName(): string;
        setName(value: string): void;

        getDescription(): string;
        setDescription(value: string): void;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): MissingKey.AsObject;
        static toObject(includeInstance: boolean, msg: MissingKey): MissingKey.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: MissingKey, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): MissingKey;
        static deserializeBinaryFromReader(message: MissingKey, reader: jspb.BinaryReader): MissingKey;
    }

    export namespace MissingKey {
        export type AsObject = {
            name: string,
            description: string,
        }
    }

}

export class InvokeRequest extends jspb.Message { 
    getTok(): string;
    setTok(value: string): void;


    hasArgs(): boolean;
    clearArgs(): void;
    getArgs(): google_protobuf_struct_pb.Struct | undefined;
    setArgs(value?: google_protobuf_struct_pb.Struct): void;

    getProvider(): string;
    setProvider(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvokeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: InvokeRequest): InvokeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvokeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvokeRequest;
    static deserializeBinaryFromReader(message: InvokeRequest, reader: jspb.BinaryReader): InvokeRequest;
}

export namespace InvokeRequest {
    export type AsObject = {
        tok: string,
        args?: google_protobuf_struct_pb.Struct.AsObject,
        provider: string,
        version: string,
    }
}

export class InvokeResponse extends jspb.Message { 

    hasReturn(): boolean;
    clearReturn(): void;
    getReturn(): google_protobuf_struct_pb.Struct | undefined;
    setReturn(value?: google_protobuf_struct_pb.Struct): void;

    clearFailuresList(): void;
    getFailuresList(): Array<CheckFailure>;
    setFailuresList(value: Array<CheckFailure>): void;
    addFailures(value?: CheckFailure, index?: number): CheckFailure;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvokeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: InvokeResponse): InvokeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvokeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvokeResponse;
    static deserializeBinaryFromReader(message: InvokeResponse, reader: jspb.BinaryReader): InvokeResponse;
}

export namespace InvokeResponse {
    export type AsObject = {
        pb_return?: google_protobuf_struct_pb.Struct.AsObject,
        failuresList: Array<CheckFailure.AsObject>,
    }
}

export class CheckRequest extends jspb.Message { 
    getUrn(): string;
    setUrn(value: string): void;


    hasOlds(): boolean;
    clearOlds(): void;
    getOlds(): google_protobuf_struct_pb.Struct | undefined;
    setOlds(value?: google_protobuf_struct_pb.Struct): void;


    hasNews(): boolean;
    clearNews(): void;
    getNews(): google_protobuf_struct_pb.Struct | undefined;
    setNews(value?: google_protobuf_struct_pb.Struct): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CheckRequest): CheckRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckRequest;
    static deserializeBinaryFromReader(message: CheckRequest, reader: jspb.BinaryReader): CheckRequest;
}

export namespace CheckRequest {
    export type AsObject = {
        urn: string,
        olds?: google_protobuf_struct_pb.Struct.AsObject,
        news?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class CheckResponse extends jspb.Message { 

    hasInputs(): boolean;
    clearInputs(): void;
    getInputs(): google_protobuf_struct_pb.Struct | undefined;
    setInputs(value?: google_protobuf_struct_pb.Struct): void;

    clearFailuresList(): void;
    getFailuresList(): Array<CheckFailure>;
    setFailuresList(value: Array<CheckFailure>): void;
    addFailures(value?: CheckFailure, index?: number): CheckFailure;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CheckResponse): CheckResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckResponse;
    static deserializeBinaryFromReader(message: CheckResponse, reader: jspb.BinaryReader): CheckResponse;
}

export namespace CheckResponse {
    export type AsObject = {
        inputs?: google_protobuf_struct_pb.Struct.AsObject,
        failuresList: Array<CheckFailure.AsObject>,
    }
}

export class CheckFailure extends jspb.Message { 
    getProperty(): string;
    setProperty(value: string): void;

    getReason(): string;
    setReason(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckFailure.AsObject;
    static toObject(includeInstance: boolean, msg: CheckFailure): CheckFailure.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckFailure, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckFailure;
    static deserializeBinaryFromReader(message: CheckFailure, reader: jspb.BinaryReader): CheckFailure;
}

export namespace CheckFailure {
    export type AsObject = {
        property: string,
        reason: string,
    }
}

export class DiffRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getUrn(): string;
    setUrn(value: string): void;


    hasOlds(): boolean;
    clearOlds(): void;
    getOlds(): google_protobuf_struct_pb.Struct | undefined;
    setOlds(value?: google_protobuf_struct_pb.Struct): void;


    hasNews(): boolean;
    clearNews(): void;
    getNews(): google_protobuf_struct_pb.Struct | undefined;
    setNews(value?: google_protobuf_struct_pb.Struct): void;

    clearIgnorechangesList(): void;
    getIgnorechangesList(): Array<string>;
    setIgnorechangesList(value: Array<string>): void;
    addIgnorechanges(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DiffRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DiffRequest): DiffRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DiffRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DiffRequest;
    static deserializeBinaryFromReader(message: DiffRequest, reader: jspb.BinaryReader): DiffRequest;
}

export namespace DiffRequest {
    export type AsObject = {
        id: string,
        urn: string,
        olds?: google_protobuf_struct_pb.Struct.AsObject,
        news?: google_protobuf_struct_pb.Struct.AsObject,
        ignorechangesList: Array<string>,
    }
}

export class PropertyDiff extends jspb.Message { 
    getKind(): PropertyDiff.Kind;
    setKind(value: PropertyDiff.Kind): void;

    getInputdiff(): boolean;
    setInputdiff(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PropertyDiff.AsObject;
    static toObject(includeInstance: boolean, msg: PropertyDiff): PropertyDiff.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PropertyDiff, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PropertyDiff;
    static deserializeBinaryFromReader(message: PropertyDiff, reader: jspb.BinaryReader): PropertyDiff;
}

export namespace PropertyDiff {
    export type AsObject = {
        kind: PropertyDiff.Kind,
        inputdiff: boolean,
    }

    export enum Kind {
    ADD = 0,
    ADD_REPLACE = 1,
    DELETE = 2,
    DELETE_REPLACE = 3,
    UPDATE = 4,
    UPDATE_REPLACE = 5,
    }

}

export class DiffResponse extends jspb.Message { 
    clearReplacesList(): void;
    getReplacesList(): Array<string>;
    setReplacesList(value: Array<string>): void;
    addReplaces(value: string, index?: number): string;

    clearStablesList(): void;
    getStablesList(): Array<string>;
    setStablesList(value: Array<string>): void;
    addStables(value: string, index?: number): string;

    getDeletebeforereplace(): boolean;
    setDeletebeforereplace(value: boolean): void;

    getChanges(): DiffResponse.DiffChanges;
    setChanges(value: DiffResponse.DiffChanges): void;

    clearDiffsList(): void;
    getDiffsList(): Array<string>;
    setDiffsList(value: Array<string>): void;
    addDiffs(value: string, index?: number): string;


    getDetaileddiffMap(): jspb.Map<string, PropertyDiff>;
    clearDetaileddiffMap(): void;

    getHasdetaileddiff(): boolean;
    setHasdetaileddiff(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DiffResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DiffResponse): DiffResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DiffResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DiffResponse;
    static deserializeBinaryFromReader(message: DiffResponse, reader: jspb.BinaryReader): DiffResponse;
}

export namespace DiffResponse {
    export type AsObject = {
        replacesList: Array<string>,
        stablesList: Array<string>,
        deletebeforereplace: boolean,
        changes: DiffResponse.DiffChanges,
        diffsList: Array<string>,

        detaileddiffMap: Array<[string, PropertyDiff.AsObject]>,
        hasdetaileddiff: boolean,
    }

    export enum DiffChanges {
    DIFF_UNKNOWN = 0,
    DIFF_NONE = 1,
    DIFF_SOME = 2,
    }

}

export class CreateRequest extends jspb.Message { 
    getUrn(): string;
    setUrn(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;

    getTimeout(): number;
    setTimeout(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateRequest;
    static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
    export type AsObject = {
        urn: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
        timeout: number,
    }
}

export class CreateResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateResponse): CreateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateResponse;
    static deserializeBinaryFromReader(message: CreateResponse, reader: jspb.BinaryReader): CreateResponse;
}

export namespace CreateResponse {
    export type AsObject = {
        id: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class ReadRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getUrn(): string;
    setUrn(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;


    hasInputs(): boolean;
    clearInputs(): void;
    getInputs(): google_protobuf_struct_pb.Struct | undefined;
    setInputs(value?: google_protobuf_struct_pb.Struct): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ReadRequest): ReadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReadRequest;
    static deserializeBinaryFromReader(message: ReadRequest, reader: jspb.BinaryReader): ReadRequest;
}

export namespace ReadRequest {
    export type AsObject = {
        id: string,
        urn: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
        inputs?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class ReadResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;


    hasInputs(): boolean;
    clearInputs(): void;
    getInputs(): google_protobuf_struct_pb.Struct | undefined;
    setInputs(value?: google_protobuf_struct_pb.Struct): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ReadResponse): ReadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReadResponse;
    static deserializeBinaryFromReader(message: ReadResponse, reader: jspb.BinaryReader): ReadResponse;
}

export namespace ReadResponse {
    export type AsObject = {
        id: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
        inputs?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class UpdateRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getUrn(): string;
    setUrn(value: string): void;


    hasOlds(): boolean;
    clearOlds(): void;
    getOlds(): google_protobuf_struct_pb.Struct | undefined;
    setOlds(value?: google_protobuf_struct_pb.Struct): void;


    hasNews(): boolean;
    clearNews(): void;
    getNews(): google_protobuf_struct_pb.Struct | undefined;
    setNews(value?: google_protobuf_struct_pb.Struct): void;

    getTimeout(): number;
    setTimeout(value: number): void;

    clearIgnorechangesList(): void;
    getIgnorechangesList(): Array<string>;
    setIgnorechangesList(value: Array<string>): void;
    addIgnorechanges(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateRequest): UpdateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateRequest;
    static deserializeBinaryFromReader(message: UpdateRequest, reader: jspb.BinaryReader): UpdateRequest;
}

export namespace UpdateRequest {
    export type AsObject = {
        id: string,
        urn: string,
        olds?: google_protobuf_struct_pb.Struct.AsObject,
        news?: google_protobuf_struct_pb.Struct.AsObject,
        timeout: number,
        ignorechangesList: Array<string>,
    }
}

export class UpdateResponse extends jspb.Message { 

    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateResponse): UpdateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateResponse;
    static deserializeBinaryFromReader(message: UpdateResponse, reader: jspb.BinaryReader): UpdateResponse;
}

export namespace UpdateResponse {
    export type AsObject = {
        properties?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class DeleteRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getUrn(): string;
    setUrn(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;

    getTimeout(): number;
    setTimeout(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteRequest): DeleteRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteRequest;
    static deserializeBinaryFromReader(message: DeleteRequest, reader: jspb.BinaryReader): DeleteRequest;
}

export namespace DeleteRequest {
    export type AsObject = {
        id: string,
        urn: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
        timeout: number,
    }
}

export class ErrorResourceInitFailed extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;

    clearReasonsList(): void;
    getReasonsList(): Array<string>;
    setReasonsList(value: Array<string>): void;
    addReasons(value: string, index?: number): string;


    hasInputs(): boolean;
    clearInputs(): void;
    getInputs(): google_protobuf_struct_pb.Struct | undefined;
    setInputs(value?: google_protobuf_struct_pb.Struct): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ErrorResourceInitFailed.AsObject;
    static toObject(includeInstance: boolean, msg: ErrorResourceInitFailed): ErrorResourceInitFailed.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ErrorResourceInitFailed, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ErrorResourceInitFailed;
    static deserializeBinaryFromReader(message: ErrorResourceInitFailed, reader: jspb.BinaryReader): ErrorResourceInitFailed;
}

export namespace ErrorResourceInitFailed {
    export type AsObject = {
        id: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
        reasonsList: Array<string>,
        inputs?: google_protobuf_struct_pb.Struct.AsObject,
    }
}
