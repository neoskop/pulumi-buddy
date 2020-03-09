// package: pulumirpc
// file: language.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as language_pb from "./language_pb";
import * as plugin_pb from "./plugin_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface ILanguageRuntimeService extends grpc.ServiceDefinition {
    getRequiredPlugins: ILanguageRuntimeService_IGetRequiredPlugins;
    run: ILanguageRuntimeService_IRun;
    getPluginInfo: ILanguageRuntimeService_IGetPluginInfo;
}

interface ILanguageRuntimeService_IGetRequiredPlugins extends grpc.ServerMethodDefinition<language_pb.GetRequiredPluginsRequest, language_pb.GetRequiredPluginsResponse> {
    path: string; // "/pulumirpc.LanguageRuntime/GetRequiredPlugins"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<language_pb.GetRequiredPluginsRequest>;
    requestDeserialize: grpc.deserialize<language_pb.GetRequiredPluginsRequest>;
    responseSerialize: grpc.serialize<language_pb.GetRequiredPluginsResponse>;
    responseDeserialize: grpc.deserialize<language_pb.GetRequiredPluginsResponse>;
}
interface ILanguageRuntimeService_IRun extends grpc.ServerMethodDefinition<language_pb.RunRequest, language_pb.RunResponse> {
    path: string; // "/pulumirpc.LanguageRuntime/Run"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<language_pb.RunRequest>;
    requestDeserialize: grpc.deserialize<language_pb.RunRequest>;
    responseSerialize: grpc.serialize<language_pb.RunResponse>;
    responseDeserialize: grpc.deserialize<language_pb.RunResponse>;
}
interface ILanguageRuntimeService_IGetPluginInfo extends grpc.ServerMethodDefinition<google_protobuf_empty_pb.Empty, plugin_pb.PluginInfo> {
    path: string; // "/pulumirpc.LanguageRuntime/GetPluginInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<plugin_pb.PluginInfo>;
    responseDeserialize: grpc.deserialize<plugin_pb.PluginInfo>;
}

export const LanguageRuntimeService: ILanguageRuntimeService;

export interface ILanguageRuntimeServer {
    getRequiredPlugins: grpc.handleUnaryCall<language_pb.GetRequiredPluginsRequest, language_pb.GetRequiredPluginsResponse>;
    run: grpc.handleUnaryCall<language_pb.RunRequest, language_pb.RunResponse>;
    getPluginInfo: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, plugin_pb.PluginInfo>;
}

export interface ILanguageRuntimeClient {
    getRequiredPlugins(request: language_pb.GetRequiredPluginsRequest, callback: (error: grpc.ServiceError | null, response: language_pb.GetRequiredPluginsResponse) => void): grpc.ClientUnaryCall;
    getRequiredPlugins(request: language_pb.GetRequiredPluginsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: language_pb.GetRequiredPluginsResponse) => void): grpc.ClientUnaryCall;
    getRequiredPlugins(request: language_pb.GetRequiredPluginsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: language_pb.GetRequiredPluginsResponse) => void): grpc.ClientUnaryCall;
    run(request: language_pb.RunRequest, callback: (error: grpc.ServiceError | null, response: language_pb.RunResponse) => void): grpc.ClientUnaryCall;
    run(request: language_pb.RunRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: language_pb.RunResponse) => void): grpc.ClientUnaryCall;
    run(request: language_pb.RunRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: language_pb.RunResponse) => void): grpc.ClientUnaryCall;
    getPluginInfo(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
}

export class LanguageRuntimeClient extends grpc.Client implements ILanguageRuntimeClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getRequiredPlugins(request: language_pb.GetRequiredPluginsRequest, callback: (error: grpc.ServiceError | null, response: language_pb.GetRequiredPluginsResponse) => void): grpc.ClientUnaryCall;
    public getRequiredPlugins(request: language_pb.GetRequiredPluginsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: language_pb.GetRequiredPluginsResponse) => void): grpc.ClientUnaryCall;
    public getRequiredPlugins(request: language_pb.GetRequiredPluginsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: language_pb.GetRequiredPluginsResponse) => void): grpc.ClientUnaryCall;
    public run(request: language_pb.RunRequest, callback: (error: grpc.ServiceError | null, response: language_pb.RunResponse) => void): grpc.ClientUnaryCall;
    public run(request: language_pb.RunRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: language_pb.RunResponse) => void): grpc.ClientUnaryCall;
    public run(request: language_pb.RunRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: language_pb.RunResponse) => void): grpc.ClientUnaryCall;
    public getPluginInfo(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    public getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    public getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
}
