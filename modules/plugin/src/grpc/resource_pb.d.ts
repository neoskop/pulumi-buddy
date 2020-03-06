// package: pulumirpc
// file: resource.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as provider_pb from "./provider_pb";

export class SupportsFeatureRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SupportsFeatureRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SupportsFeatureRequest): SupportsFeatureRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SupportsFeatureRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SupportsFeatureRequest;
    static deserializeBinaryFromReader(message: SupportsFeatureRequest, reader: jspb.BinaryReader): SupportsFeatureRequest;
}

export namespace SupportsFeatureRequest {
    export type AsObject = {
        id: string,
    }
}

export class SupportsFeatureResponse extends jspb.Message { 
    getHassupport(): boolean;
    setHassupport(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SupportsFeatureResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SupportsFeatureResponse): SupportsFeatureResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SupportsFeatureResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SupportsFeatureResponse;
    static deserializeBinaryFromReader(message: SupportsFeatureResponse, reader: jspb.BinaryReader): SupportsFeatureResponse;
}

export namespace SupportsFeatureResponse {
    export type AsObject = {
        hassupport: boolean,
    }
}

export class ReadResourceRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getType(): string;
    setType(value: string): void;

    getName(): string;
    setName(value: string): void;

    getParent(): string;
    setParent(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;

    clearDependenciesList(): void;
    getDependenciesList(): Array<string>;
    setDependenciesList(value: Array<string>): void;
    addDependencies(value: string, index?: number): string;

    getProvider(): string;
    setProvider(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;

    getAcceptsecrets(): boolean;
    setAcceptsecrets(value: boolean): void;

    clearAdditionalsecretoutputsList(): void;
    getAdditionalsecretoutputsList(): Array<string>;
    setAdditionalsecretoutputsList(value: Array<string>): void;
    addAdditionalsecretoutputs(value: string, index?: number): string;

    clearAliasesList(): void;
    getAliasesList(): Array<string>;
    setAliasesList(value: Array<string>): void;
    addAliases(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReadResourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ReadResourceRequest): ReadResourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReadResourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReadResourceRequest;
    static deserializeBinaryFromReader(message: ReadResourceRequest, reader: jspb.BinaryReader): ReadResourceRequest;
}

export namespace ReadResourceRequest {
    export type AsObject = {
        id: string,
        type: string,
        name: string,
        parent: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
        dependenciesList: Array<string>,
        provider: string,
        version: string,
        acceptsecrets: boolean,
        additionalsecretoutputsList: Array<string>,
        aliasesList: Array<string>,
    }
}

export class ReadResourceResponse extends jspb.Message { 
    getUrn(): string;
    setUrn(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReadResourceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ReadResourceResponse): ReadResourceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReadResourceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReadResourceResponse;
    static deserializeBinaryFromReader(message: ReadResourceResponse, reader: jspb.BinaryReader): ReadResourceResponse;
}

export namespace ReadResourceResponse {
    export type AsObject = {
        urn: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
    }
}

export class RegisterResourceRequest extends jspb.Message { 
    getType(): string;
    setType(value: string): void;

    getName(): string;
    setName(value: string): void;

    getParent(): string;
    setParent(value: string): void;

    getCustom(): boolean;
    setCustom(value: boolean): void;


    hasObject(): boolean;
    clearObject(): void;
    getObject(): google_protobuf_struct_pb.Struct | undefined;
    setObject(value?: google_protobuf_struct_pb.Struct): void;

    getProtect(): boolean;
    setProtect(value: boolean): void;

    clearDependenciesList(): void;
    getDependenciesList(): Array<string>;
    setDependenciesList(value: Array<string>): void;
    addDependencies(value: string, index?: number): string;

    getProvider(): string;
    setProvider(value: string): void;


    getPropertydependenciesMap(): jspb.Map<string, RegisterResourceRequest.PropertyDependencies>;
    clearPropertydependenciesMap(): void;

    getDeletebeforereplace(): boolean;
    setDeletebeforereplace(value: boolean): void;

    getVersion(): string;
    setVersion(value: string): void;

    clearIgnorechangesList(): void;
    getIgnorechangesList(): Array<string>;
    setIgnorechangesList(value: Array<string>): void;
    addIgnorechanges(value: string, index?: number): string;

    getAcceptsecrets(): boolean;
    setAcceptsecrets(value: boolean): void;

    clearAdditionalsecretoutputsList(): void;
    getAdditionalsecretoutputsList(): Array<string>;
    setAdditionalsecretoutputsList(value: Array<string>): void;
    addAdditionalsecretoutputs(value: string, index?: number): string;

    clearAliasesList(): void;
    getAliasesList(): Array<string>;
    setAliasesList(value: Array<string>): void;
    addAliases(value: string, index?: number): string;

    getImportid(): string;
    setImportid(value: string): void;


    hasCustomtimeouts(): boolean;
    clearCustomtimeouts(): void;
    getCustomtimeouts(): RegisterResourceRequest.CustomTimeouts | undefined;
    setCustomtimeouts(value?: RegisterResourceRequest.CustomTimeouts): void;

    getDeletebeforereplacedefined(): boolean;
    setDeletebeforereplacedefined(value: boolean): void;

    getSupportspartialvalues(): boolean;
    setSupportspartialvalues(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegisterResourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RegisterResourceRequest): RegisterResourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegisterResourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegisterResourceRequest;
    static deserializeBinaryFromReader(message: RegisterResourceRequest, reader: jspb.BinaryReader): RegisterResourceRequest;
}

export namespace RegisterResourceRequest {
    export type AsObject = {
        type: string,
        name: string,
        parent: string,
        custom: boolean,
        object?: google_protobuf_struct_pb.Struct.AsObject,
        protect: boolean,
        dependenciesList: Array<string>,
        provider: string,

        propertydependenciesMap: Array<[string, RegisterResourceRequest.PropertyDependencies.AsObject]>,
        deletebeforereplace: boolean,
        version: string,
        ignorechangesList: Array<string>,
        acceptsecrets: boolean,
        additionalsecretoutputsList: Array<string>,
        aliasesList: Array<string>,
        importid: string,
        customtimeouts?: RegisterResourceRequest.CustomTimeouts.AsObject,
        deletebeforereplacedefined: boolean,
        supportspartialvalues: boolean,
    }


    export class PropertyDependencies extends jspb.Message { 
        clearUrnsList(): void;
        getUrnsList(): Array<string>;
        setUrnsList(value: Array<string>): void;
        addUrns(value: string, index?: number): string;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): PropertyDependencies.AsObject;
        static toObject(includeInstance: boolean, msg: PropertyDependencies): PropertyDependencies.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: PropertyDependencies, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): PropertyDependencies;
        static deserializeBinaryFromReader(message: PropertyDependencies, reader: jspb.BinaryReader): PropertyDependencies;
    }

    export namespace PropertyDependencies {
        export type AsObject = {
            urnsList: Array<string>,
        }
    }

    export class CustomTimeouts extends jspb.Message { 
        getCreate(): string;
        setCreate(value: string): void;

        getUpdate(): string;
        setUpdate(value: string): void;

        getDelete(): string;
        setDelete(value: string): void;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): CustomTimeouts.AsObject;
        static toObject(includeInstance: boolean, msg: CustomTimeouts): CustomTimeouts.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: CustomTimeouts, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): CustomTimeouts;
        static deserializeBinaryFromReader(message: CustomTimeouts, reader: jspb.BinaryReader): CustomTimeouts;
    }

    export namespace CustomTimeouts {
        export type AsObject = {
            create: string,
            update: string,
            pb_delete: string,
        }
    }

}

export class RegisterResourceResponse extends jspb.Message { 
    getUrn(): string;
    setUrn(value: string): void;

    getId(): string;
    setId(value: string): void;


    hasObject(): boolean;
    clearObject(): void;
    getObject(): google_protobuf_struct_pb.Struct | undefined;
    setObject(value?: google_protobuf_struct_pb.Struct): void;

    getStable(): boolean;
    setStable(value: boolean): void;

    clearStablesList(): void;
    getStablesList(): Array<string>;
    setStablesList(value: Array<string>): void;
    addStables(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegisterResourceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RegisterResourceResponse): RegisterResourceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegisterResourceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegisterResourceResponse;
    static deserializeBinaryFromReader(message: RegisterResourceResponse, reader: jspb.BinaryReader): RegisterResourceResponse;
}

export namespace RegisterResourceResponse {
    export type AsObject = {
        urn: string,
        id: string,
        object?: google_protobuf_struct_pb.Struct.AsObject,
        stable: boolean,
        stablesList: Array<string>,
    }
}

export class RegisterResourceOutputsRequest extends jspb.Message { 
    getUrn(): string;
    setUrn(value: string): void;


    hasOutputs(): boolean;
    clearOutputs(): void;
    getOutputs(): google_protobuf_struct_pb.Struct | undefined;
    setOutputs(value?: google_protobuf_struct_pb.Struct): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegisterResourceOutputsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RegisterResourceOutputsRequest): RegisterResourceOutputsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegisterResourceOutputsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegisterResourceOutputsRequest;
    static deserializeBinaryFromReader(message: RegisterResourceOutputsRequest, reader: jspb.BinaryReader): RegisterResourceOutputsRequest;
}

export namespace RegisterResourceOutputsRequest {
    export type AsObject = {
        urn: string,
        outputs?: google_protobuf_struct_pb.Struct.AsObject,
    }
}
