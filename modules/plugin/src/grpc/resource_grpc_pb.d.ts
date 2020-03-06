// package: pulumirpc
// file: resource.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as resource_pb from "./resource_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as provider_pb from "./provider_pb";

interface IResourceMonitorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    supportsFeature: IResourceMonitorService_ISupportsFeature;
    invoke: IResourceMonitorService_IInvoke;
    streamInvoke: IResourceMonitorService_IStreamInvoke;
    readResource: IResourceMonitorService_IReadResource;
    registerResource: IResourceMonitorService_IRegisterResource;
    registerResourceOutputs: IResourceMonitorService_IRegisterResourceOutputs;
}

interface IResourceMonitorService_ISupportsFeature extends grpc.MethodDefinition<resource_pb.SupportsFeatureRequest, resource_pb.SupportsFeatureResponse> {
    path: string; // "/pulumirpc.ResourceMonitor/SupportsFeature"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<resource_pb.SupportsFeatureRequest>;
    requestDeserialize: grpc.deserialize<resource_pb.SupportsFeatureRequest>;
    responseSerialize: grpc.serialize<resource_pb.SupportsFeatureResponse>;
    responseDeserialize: grpc.deserialize<resource_pb.SupportsFeatureResponse>;
}
interface IResourceMonitorService_IInvoke extends grpc.MethodDefinition<provider_pb.InvokeRequest, provider_pb.InvokeResponse> {
    path: string; // "/pulumirpc.ResourceMonitor/Invoke"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<provider_pb.InvokeRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.InvokeRequest>;
    responseSerialize: grpc.serialize<provider_pb.InvokeResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.InvokeResponse>;
}
interface IResourceMonitorService_IStreamInvoke extends grpc.MethodDefinition<provider_pb.InvokeRequest, provider_pb.InvokeResponse> {
    path: string; // "/pulumirpc.ResourceMonitor/StreamInvoke"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<provider_pb.InvokeRequest>;
    requestDeserialize: grpc.deserialize<provider_pb.InvokeRequest>;
    responseSerialize: grpc.serialize<provider_pb.InvokeResponse>;
    responseDeserialize: grpc.deserialize<provider_pb.InvokeResponse>;
}
interface IResourceMonitorService_IReadResource extends grpc.MethodDefinition<resource_pb.ReadResourceRequest, resource_pb.ReadResourceResponse> {
    path: string; // "/pulumirpc.ResourceMonitor/ReadResource"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<resource_pb.ReadResourceRequest>;
    requestDeserialize: grpc.deserialize<resource_pb.ReadResourceRequest>;
    responseSerialize: grpc.serialize<resource_pb.ReadResourceResponse>;
    responseDeserialize: grpc.deserialize<resource_pb.ReadResourceResponse>;
}
interface IResourceMonitorService_IRegisterResource extends grpc.MethodDefinition<resource_pb.RegisterResourceRequest, resource_pb.RegisterResourceResponse> {
    path: string; // "/pulumirpc.ResourceMonitor/RegisterResource"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<resource_pb.RegisterResourceRequest>;
    requestDeserialize: grpc.deserialize<resource_pb.RegisterResourceRequest>;
    responseSerialize: grpc.serialize<resource_pb.RegisterResourceResponse>;
    responseDeserialize: grpc.deserialize<resource_pb.RegisterResourceResponse>;
}
interface IResourceMonitorService_IRegisterResourceOutputs extends grpc.MethodDefinition<resource_pb.RegisterResourceOutputsRequest, google_protobuf_empty_pb.Empty> {
    path: string; // "/pulumirpc.ResourceMonitor/RegisterResourceOutputs"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<resource_pb.RegisterResourceOutputsRequest>;
    requestDeserialize: grpc.deserialize<resource_pb.RegisterResourceOutputsRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const ResourceMonitorService: IResourceMonitorService;

export interface IResourceMonitorServer {
    supportsFeature: grpc.handleUnaryCall<resource_pb.SupportsFeatureRequest, resource_pb.SupportsFeatureResponse>;
    invoke: grpc.handleUnaryCall<provider_pb.InvokeRequest, provider_pb.InvokeResponse>;
    streamInvoke: grpc.handleServerStreamingCall<provider_pb.InvokeRequest, provider_pb.InvokeResponse>;
    readResource: grpc.handleUnaryCall<resource_pb.ReadResourceRequest, resource_pb.ReadResourceResponse>;
    registerResource: grpc.handleUnaryCall<resource_pb.RegisterResourceRequest, resource_pb.RegisterResourceResponse>;
    registerResourceOutputs: grpc.handleUnaryCall<resource_pb.RegisterResourceOutputsRequest, google_protobuf_empty_pb.Empty>;
}

export interface IResourceMonitorClient {
    supportsFeature(request: resource_pb.SupportsFeatureRequest, callback: (error: grpc.ServiceError | null, response: resource_pb.SupportsFeatureResponse) => void): grpc.ClientUnaryCall;
    supportsFeature(request: resource_pb.SupportsFeatureRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: resource_pb.SupportsFeatureResponse) => void): grpc.ClientUnaryCall;
    supportsFeature(request: resource_pb.SupportsFeatureRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: resource_pb.SupportsFeatureResponse) => void): grpc.ClientUnaryCall;
    invoke(request: provider_pb.InvokeRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    invoke(request: provider_pb.InvokeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    invoke(request: provider_pb.InvokeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    streamInvoke(request: provider_pb.InvokeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<provider_pb.InvokeResponse>;
    streamInvoke(request: provider_pb.InvokeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<provider_pb.InvokeResponse>;
    readResource(request: resource_pb.ReadResourceRequest, callback: (error: grpc.ServiceError | null, response: resource_pb.ReadResourceResponse) => void): grpc.ClientUnaryCall;
    readResource(request: resource_pb.ReadResourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: resource_pb.ReadResourceResponse) => void): grpc.ClientUnaryCall;
    readResource(request: resource_pb.ReadResourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: resource_pb.ReadResourceResponse) => void): grpc.ClientUnaryCall;
    registerResource(request: resource_pb.RegisterResourceRequest, callback: (error: grpc.ServiceError | null, response: resource_pb.RegisterResourceResponse) => void): grpc.ClientUnaryCall;
    registerResource(request: resource_pb.RegisterResourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: resource_pb.RegisterResourceResponse) => void): grpc.ClientUnaryCall;
    registerResource(request: resource_pb.RegisterResourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: resource_pb.RegisterResourceResponse) => void): grpc.ClientUnaryCall;
    registerResourceOutputs(request: resource_pb.RegisterResourceOutputsRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    registerResourceOutputs(request: resource_pb.RegisterResourceOutputsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    registerResourceOutputs(request: resource_pb.RegisterResourceOutputsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class ResourceMonitorClient extends grpc.Client implements IResourceMonitorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public supportsFeature(request: resource_pb.SupportsFeatureRequest, callback: (error: grpc.ServiceError | null, response: resource_pb.SupportsFeatureResponse) => void): grpc.ClientUnaryCall;
    public supportsFeature(request: resource_pb.SupportsFeatureRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: resource_pb.SupportsFeatureResponse) => void): grpc.ClientUnaryCall;
    public supportsFeature(request: resource_pb.SupportsFeatureRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: resource_pb.SupportsFeatureResponse) => void): grpc.ClientUnaryCall;
    public invoke(request: provider_pb.InvokeRequest, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    public invoke(request: provider_pb.InvokeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    public invoke(request: provider_pb.InvokeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: provider_pb.InvokeResponse) => void): grpc.ClientUnaryCall;
    public streamInvoke(request: provider_pb.InvokeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<provider_pb.InvokeResponse>;
    public streamInvoke(request: provider_pb.InvokeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<provider_pb.InvokeResponse>;
    public readResource(request: resource_pb.ReadResourceRequest, callback: (error: grpc.ServiceError | null, response: resource_pb.ReadResourceResponse) => void): grpc.ClientUnaryCall;
    public readResource(request: resource_pb.ReadResourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: resource_pb.ReadResourceResponse) => void): grpc.ClientUnaryCall;
    public readResource(request: resource_pb.ReadResourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: resource_pb.ReadResourceResponse) => void): grpc.ClientUnaryCall;
    public registerResource(request: resource_pb.RegisterResourceRequest, callback: (error: grpc.ServiceError | null, response: resource_pb.RegisterResourceResponse) => void): grpc.ClientUnaryCall;
    public registerResource(request: resource_pb.RegisterResourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: resource_pb.RegisterResourceResponse) => void): grpc.ClientUnaryCall;
    public registerResource(request: resource_pb.RegisterResourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: resource_pb.RegisterResourceResponse) => void): grpc.ClientUnaryCall;
    public registerResourceOutputs(request: resource_pb.RegisterResourceOutputsRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public registerResourceOutputs(request: resource_pb.RegisterResourceOutputsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public registerResourceOutputs(request: resource_pb.RegisterResourceOutputsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
