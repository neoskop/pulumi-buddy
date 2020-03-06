// package: pulumirpc
// file: analyzer.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as plugin_pb from "./plugin_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class AnalyzeRequest extends jspb.Message { 
    getType(): string;
    setType(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;

    getUrn(): string;
    setUrn(value: string): void;

    getName(): string;
    setName(value: string): void;


    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): AnalyzerResourceOptions | undefined;
    setOptions(value?: AnalyzerResourceOptions): void;


    hasProvider(): boolean;
    clearProvider(): void;
    getProvider(): AnalyzerProviderResource | undefined;
    setProvider(value?: AnalyzerProviderResource): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AnalyzeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AnalyzeRequest): AnalyzeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AnalyzeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AnalyzeRequest;
    static deserializeBinaryFromReader(message: AnalyzeRequest, reader: jspb.BinaryReader): AnalyzeRequest;
}

export namespace AnalyzeRequest {
    export type AsObject = {
        type: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
        urn: string,
        name: string,
        options?: AnalyzerResourceOptions.AsObject,
        provider?: AnalyzerProviderResource.AsObject,
    }
}

export class AnalyzerResource extends jspb.Message { 
    getType(): string;
    setType(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;

    getUrn(): string;
    setUrn(value: string): void;

    getName(): string;
    setName(value: string): void;


    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): AnalyzerResourceOptions | undefined;
    setOptions(value?: AnalyzerResourceOptions): void;


    hasProvider(): boolean;
    clearProvider(): void;
    getProvider(): AnalyzerProviderResource | undefined;
    setProvider(value?: AnalyzerProviderResource): void;

    getParent(): string;
    setParent(value: string): void;

    clearDependenciesList(): void;
    getDependenciesList(): Array<string>;
    setDependenciesList(value: Array<string>): void;
    addDependencies(value: string, index?: number): string;


    getPropertydependenciesMap(): jspb.Map<string, AnalyzerPropertyDependencies>;
    clearPropertydependenciesMap(): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AnalyzerResource.AsObject;
    static toObject(includeInstance: boolean, msg: AnalyzerResource): AnalyzerResource.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AnalyzerResource, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AnalyzerResource;
    static deserializeBinaryFromReader(message: AnalyzerResource, reader: jspb.BinaryReader): AnalyzerResource;
}

export namespace AnalyzerResource {
    export type AsObject = {
        type: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
        urn: string,
        name: string,
        options?: AnalyzerResourceOptions.AsObject,
        provider?: AnalyzerProviderResource.AsObject,
        parent: string,
        dependenciesList: Array<string>,

        propertydependenciesMap: Array<[string, AnalyzerPropertyDependencies.AsObject]>,
    }
}

export class AnalyzerResourceOptions extends jspb.Message { 
    getProtect(): boolean;
    setProtect(value: boolean): void;

    clearIgnorechangesList(): void;
    getIgnorechangesList(): Array<string>;
    setIgnorechangesList(value: Array<string>): void;
    addIgnorechanges(value: string, index?: number): string;

    getDeletebeforereplace(): boolean;
    setDeletebeforereplace(value: boolean): void;

    getDeletebeforereplacedefined(): boolean;
    setDeletebeforereplacedefined(value: boolean): void;

    clearAdditionalsecretoutputsList(): void;
    getAdditionalsecretoutputsList(): Array<string>;
    setAdditionalsecretoutputsList(value: Array<string>): void;
    addAdditionalsecretoutputs(value: string, index?: number): string;

    clearAliasesList(): void;
    getAliasesList(): Array<string>;
    setAliasesList(value: Array<string>): void;
    addAliases(value: string, index?: number): string;


    hasCustomtimeouts(): boolean;
    clearCustomtimeouts(): void;
    getCustomtimeouts(): AnalyzerResourceOptions.CustomTimeouts | undefined;
    setCustomtimeouts(value?: AnalyzerResourceOptions.CustomTimeouts): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AnalyzerResourceOptions.AsObject;
    static toObject(includeInstance: boolean, msg: AnalyzerResourceOptions): AnalyzerResourceOptions.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AnalyzerResourceOptions, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AnalyzerResourceOptions;
    static deserializeBinaryFromReader(message: AnalyzerResourceOptions, reader: jspb.BinaryReader): AnalyzerResourceOptions;
}

export namespace AnalyzerResourceOptions {
    export type AsObject = {
        protect: boolean,
        ignorechangesList: Array<string>,
        deletebeforereplace: boolean,
        deletebeforereplacedefined: boolean,
        additionalsecretoutputsList: Array<string>,
        aliasesList: Array<string>,
        customtimeouts?: AnalyzerResourceOptions.CustomTimeouts.AsObject,
    }


    export class CustomTimeouts extends jspb.Message { 
        getCreate(): number;
        setCreate(value: number): void;

        getUpdate(): number;
        setUpdate(value: number): void;

        getDelete(): number;
        setDelete(value: number): void;


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
            create: number,
            update: number,
            pb_delete: number,
        }
    }

}

export class AnalyzerProviderResource extends jspb.Message { 
    getType(): string;
    setType(value: string): void;


    hasProperties(): boolean;
    clearProperties(): void;
    getProperties(): google_protobuf_struct_pb.Struct | undefined;
    setProperties(value?: google_protobuf_struct_pb.Struct): void;

    getUrn(): string;
    setUrn(value: string): void;

    getName(): string;
    setName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AnalyzerProviderResource.AsObject;
    static toObject(includeInstance: boolean, msg: AnalyzerProviderResource): AnalyzerProviderResource.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AnalyzerProviderResource, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AnalyzerProviderResource;
    static deserializeBinaryFromReader(message: AnalyzerProviderResource, reader: jspb.BinaryReader): AnalyzerProviderResource;
}

export namespace AnalyzerProviderResource {
    export type AsObject = {
        type: string,
        properties?: google_protobuf_struct_pb.Struct.AsObject,
        urn: string,
        name: string,
    }
}

export class AnalyzerPropertyDependencies extends jspb.Message { 
    clearUrnsList(): void;
    getUrnsList(): Array<string>;
    setUrnsList(value: Array<string>): void;
    addUrns(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AnalyzerPropertyDependencies.AsObject;
    static toObject(includeInstance: boolean, msg: AnalyzerPropertyDependencies): AnalyzerPropertyDependencies.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AnalyzerPropertyDependencies, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AnalyzerPropertyDependencies;
    static deserializeBinaryFromReader(message: AnalyzerPropertyDependencies, reader: jspb.BinaryReader): AnalyzerPropertyDependencies;
}

export namespace AnalyzerPropertyDependencies {
    export type AsObject = {
        urnsList: Array<string>,
    }
}

export class AnalyzeStackRequest extends jspb.Message { 
    clearResourcesList(): void;
    getResourcesList(): Array<AnalyzerResource>;
    setResourcesList(value: Array<AnalyzerResource>): void;
    addResources(value?: AnalyzerResource, index?: number): AnalyzerResource;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AnalyzeStackRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AnalyzeStackRequest): AnalyzeStackRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AnalyzeStackRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AnalyzeStackRequest;
    static deserializeBinaryFromReader(message: AnalyzeStackRequest, reader: jspb.BinaryReader): AnalyzeStackRequest;
}

export namespace AnalyzeStackRequest {
    export type AsObject = {
        resourcesList: Array<AnalyzerResource.AsObject>,
    }
}

export class AnalyzeResponse extends jspb.Message { 
    clearDiagnosticsList(): void;
    getDiagnosticsList(): Array<AnalyzeDiagnostic>;
    setDiagnosticsList(value: Array<AnalyzeDiagnostic>): void;
    addDiagnostics(value?: AnalyzeDiagnostic, index?: number): AnalyzeDiagnostic;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AnalyzeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AnalyzeResponse): AnalyzeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AnalyzeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AnalyzeResponse;
    static deserializeBinaryFromReader(message: AnalyzeResponse, reader: jspb.BinaryReader): AnalyzeResponse;
}

export namespace AnalyzeResponse {
    export type AsObject = {
        diagnosticsList: Array<AnalyzeDiagnostic.AsObject>,
    }
}

export class AnalyzeDiagnostic extends jspb.Message { 
    getPolicyname(): string;
    setPolicyname(value: string): void;

    getPolicypackname(): string;
    setPolicypackname(value: string): void;

    getPolicypackversion(): string;
    setPolicypackversion(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;

    getMessage(): string;
    setMessage(value: string): void;

    clearTagsList(): void;
    getTagsList(): Array<string>;
    setTagsList(value: Array<string>): void;
    addTags(value: string, index?: number): string;

    getEnforcementlevel(): EnforcementLevel;
    setEnforcementlevel(value: EnforcementLevel): void;

    getUrn(): string;
    setUrn(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AnalyzeDiagnostic.AsObject;
    static toObject(includeInstance: boolean, msg: AnalyzeDiagnostic): AnalyzeDiagnostic.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AnalyzeDiagnostic, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AnalyzeDiagnostic;
    static deserializeBinaryFromReader(message: AnalyzeDiagnostic, reader: jspb.BinaryReader): AnalyzeDiagnostic;
}

export namespace AnalyzeDiagnostic {
    export type AsObject = {
        policyname: string,
        policypackname: string,
        policypackversion: string,
        description: string,
        message: string,
        tagsList: Array<string>,
        enforcementlevel: EnforcementLevel,
        urn: string,
    }
}

export class AnalyzerInfo extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getDisplayname(): string;
    setDisplayname(value: string): void;

    clearPoliciesList(): void;
    getPoliciesList(): Array<PolicyInfo>;
    setPoliciesList(value: Array<PolicyInfo>): void;
    addPolicies(value?: PolicyInfo, index?: number): PolicyInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AnalyzerInfo.AsObject;
    static toObject(includeInstance: boolean, msg: AnalyzerInfo): AnalyzerInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AnalyzerInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AnalyzerInfo;
    static deserializeBinaryFromReader(message: AnalyzerInfo, reader: jspb.BinaryReader): AnalyzerInfo;
}

export namespace AnalyzerInfo {
    export type AsObject = {
        name: string,
        displayname: string,
        policiesList: Array<PolicyInfo.AsObject>,
    }
}

export class PolicyInfo extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getDisplayname(): string;
    setDisplayname(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;

    getMessage(): string;
    setMessage(value: string): void;

    getEnforcementlevel(): EnforcementLevel;
    setEnforcementlevel(value: EnforcementLevel): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PolicyInfo.AsObject;
    static toObject(includeInstance: boolean, msg: PolicyInfo): PolicyInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PolicyInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PolicyInfo;
    static deserializeBinaryFromReader(message: PolicyInfo, reader: jspb.BinaryReader): PolicyInfo;
}

export namespace PolicyInfo {
    export type AsObject = {
        name: string,
        displayname: string,
        description: string,
        message: string,
        enforcementlevel: EnforcementLevel,
    }
}

export enum EnforcementLevel {
    ADVISORY = 0,
    MANDATORY = 1,
}
