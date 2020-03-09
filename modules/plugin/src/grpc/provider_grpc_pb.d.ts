// package: pulumirpc
// file: provider.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as provider_pb from "./provider_pb";
import * as plugin_pb from "./plugin_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

interface IResourceProviderService extends grpc.ServiceDefinition {
    checkConfig: IResourceProviderService_ICheckConfig;
    diffConfig: IResourceProviderService_IDiffConfig;
    configure: IResourceProviderService_IConfigure;
    invoke: IResourceProviderService_IInvoke;
    streamInvoke: IResourceProviderService_IStreamInvoke;
    check: IResourceProviderService_ICheck;
    diff: IResourceProviderService_IDiff;
    create: IResourceProviderService_ICreate;
    read: IResourceProviderService_IRead;
    update: IResourceProviderService_IUpdate;
    delete: IResourceProviderService_IDelete;
    cancel: IResourceProviderService_ICancel;
    getPluginInfo: IResourceProviderService_IGetPluginInfo;
}

interface IResourceProviderService_ICheckConfig extends grpc.ServerMethodDefinition<provider_pb.CheckRequest, provider_pb.CheckResponse> {
    path: string; // "/pulumirpc.ResourceProvider/CheckConfig"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.CheckRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.CheckRequest>;
    responseSerialize: grpc.serialize<provider_pb.CheckResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.CheckResponse>;
}
interface IResourceProviderService_IDiffConfig extends grpc.ServerMethodDefinition<provider_pb.DiffRequest, provider_pb.DiffResponse> {
    path: string; // "/pulumirpc.ResourceProvider/DiffConfig"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.DiffRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.DiffRequest>;
    responseSerialize: grpc.serialize<provider_pb.DiffResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.DiffResponse>;
}
interface IResourceProviderService_IConfigure extends grpc.ServerMethodDefinition<provider_pb.ConfigureRequest, provider_pb.ConfigureResponse> {
    path: string; // "/pulumirpc.ResourceProvider/Configure"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.ConfigureRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.ConfigureRequest>;
    responseSerialize: grpc.serialize<provider_pb.ConfigureResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.ConfigureResponse>;
}
interface IResourceProviderService_IInvoke extends grpc.ServerMethodDefinition<provider_pb.InvokeRequest, provider_pb.InvokeResponse> {
    path: string; // "/pulumirpc.ResourceProvider/Invoke"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.InvokeRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.InvokeRequest>;
    responseSerialize: grpc.serialize<provider_pb.InvokeResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.InvokeResponse>;
}
interface IResourceProviderService_IStreamInvoke extends grpc.ServerMethodDefinition<provider_pb.InvokeRequest, provider_pb.InvokeResponse> {
    path: string; // "/pulumirpc.ResourceProvider/StreamInvoke"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<provider_pb.InvokeRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.InvokeRequest>;
    responseSerialize: grpc.serialize<provider_pb.InvokeResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.InvokeResponse>;
}
interface IResourceProviderService_ICheck extends grpc.ServerMethodDefinition<provider_pb.CheckRequest, provider_pb.CheckResponse> {
    path: string; // "/pulumirpc.ResourceProvider/Check"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.CheckRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.CheckRequest>;
    responseSerialize: grpc.serialize<provider_pb.CheckResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.CheckResponse>;
}
interface IResourceProviderService_IDiff extends grpc.ServerMethodDefinition<provider_pb.DiffRequest, provider_pb.DiffResponse> {
    path: string; // "/pulumirpc.ResourceProvider/Diff"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.DiffRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.DiffRequest>;
    responseSerialize: grpc.serialize<provider_pb.DiffResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.DiffResponse>;
}
interface IResourceProviderService_ICreate extends grpc.ServerMethodDefinition<provider_pb.CreateRequest, provider_pb.CreateResponse> {
    path: string; // "/pulumirpc.ResourceProvider/Create"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.CreateRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.CreateRequest>;
    responseSerialize: grpc.serialize<provider_pb.CreateResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.CreateResponse>;
}
interface IResourceProviderService_IRead extends grpc.ServerMethodDefinition<provider_pb.ReadRequest, provider_pb.ReadResponse> {
    path: string; // "/pulumirpc.ResourceProvider/Read"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.ReadRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.ReadRequest>;
    responseSerialize: grpc.serialize<provider_pb.ReadResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.ReadResponse>;
}
interface IResourceProviderService_IUpdate extends grpc.ServerMethodDefinition<provider_pb.UpdateRequest, provider_pb.UpdateResponse> {
    path: string; // "/pulumirpc.ResourceProvider/Update"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.UpdateRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.UpdateRequest>;
    responseSerialize: grpc.serialize<provider_pb.UpdateResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.UpdateResponse>;
}
interface IResourceProviderService_IDelete extends grpc.ServerMethodDefinition<provider_pb.DeleteRequest, google_protobuf_empty_pb.Empty> {
    path: string; // "/pulumirpc.ResourceProvider/Delete"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.DeleteRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.DeleteRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IResourceProviderService_ICancel extends grpc.ServerMethodDefinition<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty> {
    path: string; // "/pulumirpc.ResourceProvider/Cancel"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IResourceProviderService_IGetPluginInfo extends grpc.ServerMethodDefinition<google_protobuf_empty_pb.Empty, plugin_pb.PluginInfo> {
    path: string; // "/pulumirpc.ResourceProvider/GetPluginInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<plugin_pb.PluginInfo>;
    responseDeserialize: grpc.deserialize<plugin_pb.PluginInfo>;
}

export const ResourceProviderService: IResourceProviderService;

export interface IResourceProviderServer {
    checkConfig: grpc.handleUnaryCall<provider_pb.CheckRequest, provider_pb.CheckResponse>;
    diffConfig: grpc.handleUnaryCall<provider_pb.DiffRequest, provider_pb.DiffResponse>;
    configure: grpc.handleUnaryCall<provider_pb.ConfigureRequest, provider_pb.ConfigureResponse>;
    invoke: grpc.handleUnaryCall<provider_pb.InvokeRequest, provider_pb.InvokeResponse>;
    streamInvoke: grpc.handleServerStreamingCall<provider_pb.InvokeRequest, provider_pb.InvokeResponse>;
    check: grpc.handleUnaryCall<provider_pb.CheckRequest, provider_pb.CheckResponse>;
    diff: grpc.handleUnaryCall<provider_pb.DiffRequest, provider_pb.DiffResponse>;
    create: grpc.handleUnaryCall<provider_pb.CreateRequest, provider_pb.CreateResponse>;
    read: grpc.handleUnaryCall<provider_pb.ReadRequest, provider_pb.ReadResponse>;
    update: grpc.handleUnaryCall<provider_pb.UpdateRequest, provider_pb.UpdateResponse>;
    delete: grpc.handleUnaryCall<provider_pb.DeleteRequest, google_protobuf_empty_pb.Empty>;
    cancel: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty>;
    getPluginInfo: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, plugin_pb.PluginInfo>;
}

export interface IResourceProviderClient {
    checkConfig(request: provider_pb.CheckRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    checkConfig(request: provider_pb.CheckRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    checkConfig(request: provider_pb.CheckRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    diffConfig(request: provider_pb.DiffRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    diffConfig(request: provider_pb.DiffRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    diffConfig(request: provider_pb.DiffRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    configure(request: provider_pb.ConfigureRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.ConfigureResponse) => void): grpc.ClientUnaryCall;
    configure(request: provider_pb.ConfigureRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.ConfigureResponse) => void): grpc.ClientUnaryCall;
    configure(request: provider_pb.ConfigureRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.ConfigureResponse) => void): grpc.ClientUnaryCall;
    invoke(request: provider_pb.InvokeRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    invoke(request: provider_pb.InvokeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    invoke(request: provider_pb.InvokeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    streamInvoke(request: provider_pb.InvokeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<provider_pb.InvokeResponse>;
    streamInvoke(request: provider_pb.InvokeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<provider_pb.InvokeResponse>;
    check(request: provider_pb.CheckRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    check(request: provider_pb.CheckRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    check(request: provider_pb.CheckRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    diff(request: provider_pb.DiffRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    diff(request: provider_pb.DiffRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    diff(request: provider_pb.DiffRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    create(request: provider_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    create(request: provider_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    create(request: provider_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    read(request: provider_pb.ReadRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.ReadResponse) => void): grpc.ClientUnaryCall;
    read(request: provider_pb.ReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.ReadResponse) => void): grpc.ClientUnaryCall;
    read(request: provider_pb.ReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.ReadResponse) => void): grpc.ClientUnaryCall;
    update(request: provider_pb.UpdateRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    update(request: provider_pb.UpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    update(request: provider_pb.UpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    delete(request: provider_pb.DeleteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    delete(request: provider_pb.DeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    delete(request: provider_pb.DeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    cancel(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    cancel(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    cancel(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    getPluginInfo(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
}

export class ResourceProviderClient extends grpc.Client implements IResourceProviderClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public checkConfig(request: provider_pb.CheckRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    public checkConfig(request: provider_pb.CheckRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    public checkConfig(request: provider_pb.CheckRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    public diffConfig(request: provider_pb.DiffRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    public diffConfig(request: provider_pb.DiffRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    public diffConfig(request: provider_pb.DiffRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    public configure(request: provider_pb.ConfigureRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.ConfigureResponse) => void): grpc.ClientUnaryCall;
    public configure(request: provider_pb.ConfigureRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.ConfigureResponse) => void): grpc.ClientUnaryCall;
    public configure(request: provider_pb.ConfigureRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.ConfigureResponse) => void): grpc.ClientUnaryCall;
    public invoke(request: provider_pb.InvokeRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    public invoke(request: provider_pb.InvokeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    public invoke(request: provider_pb.InvokeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    public streamInvoke(request: provider_pb.InvokeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<provider_pb.InvokeResponse>;
    public streamInvoke(request: provider_pb.InvokeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<provider_pb.InvokeResponse>;
    public check(request: provider_pb.CheckRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    public check(request: provider_pb.CheckRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    public check(request: provider_pb.CheckRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.CheckResponse) => void): grpc.ClientUnaryCall;
    public diff(request: provider_pb.DiffRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    public diff(request: provider_pb.DiffRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    public diff(request: provider_pb.DiffRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.DiffResponse) => void): grpc.ClientUnaryCall;
    public create(request: provider_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: provider_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: provider_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public read(request: provider_pb.ReadRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.ReadResponse) => void): grpc.ClientUnaryCall;
    public read(request: provider_pb.ReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.ReadResponse) => void): grpc.ClientUnaryCall;
    public read(request: provider_pb.ReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.ReadResponse) => void): grpc.ClientUnaryCall;
    public update(request: provider_pb.UpdateRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    public update(request: provider_pb.UpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    public update(request: provider_pb.UpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    public delete(request: provider_pb.DeleteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public delete(request: provider_pb.DeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public delete(request: provider_pb.DeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public cancel(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public cancel(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public cancel(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public getPluginInfo(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    public getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    public getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
}
