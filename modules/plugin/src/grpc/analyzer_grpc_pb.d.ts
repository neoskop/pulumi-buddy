// package: pulumirpc
// file: analyzer.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as analyzer_pb from "./analyzer_pb";
import * as plugin_pb from "./plugin_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

interface IAnalyzerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    analyze: IAnalyzerService_IAnalyze;
    analyzeStack: IAnalyzerService_IAnalyzeStack;
    getAnalyzerInfo: IAnalyzerService_IGetAnalyzerInfo;
    getPluginInfo: IAnalyzerService_IGetPluginInfo;
}

interface IAnalyzerService_IAnalyze extends grpc.MethodDefinition<analyzer_pb.AnalyzeRequest, analyzer_pb.AnalyzeResponse> {
    path: string; // "/pulumirpc.Analyzer/Analyze"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<analyzer_pb.AnalyzeRequest>;
    requestDeserialize: grpc.deserialize<analyzer_pb.AnalyzeRequest>;
    responseSerialize: grpc.serialize<analyzer_pb.AnalyzeResponse>;
    responseDeserialize: grpc.deserialize<analyzer_pb.AnalyzeResponse>;
}
interface IAnalyzerService_IAnalyzeStack extends grpc.MethodDefinition<analyzer_pb.AnalyzeStackRequest, analyzer_pb.AnalyzeResponse> {
    path: string; // "/pulumirpc.Analyzer/AnalyzeStack"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<analyzer_pb.AnalyzeStackRequest>;
    requestDeserialize: grpc.deserialize<analyzer_pb.AnalyzeStackRequest>;
    responseSerialize: grpc.serialize<analyzer_pb.AnalyzeResponse>;
    responseDeserialize: grpc.deserialize<analyzer_pb.AnalyzeResponse>;
}
interface IAnalyzerService_IGetAnalyzerInfo extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, analyzer_pb.AnalyzerInfo> {
    path: string; // "/pulumirpc.Analyzer/GetAnalyzerInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<analyzer_pb.AnalyzerInfo>;
    responseDeserialize: grpc.deserialize<analyzer_pb.AnalyzerInfo>;
}
interface IAnalyzerService_IGetPluginInfo extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, plugin_pb.PluginInfo> {
    path: string; // "/pulumirpc.Analyzer/GetPluginInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<plugin_pb.PluginInfo>;
    responseDeserialize: grpc.deserialize<plugin_pb.PluginInfo>;
}

export const AnalyzerService: IAnalyzerService;

export interface IAnalyzerServer {
    analyze: grpc.handleUnaryCall<analyzer_pb.AnalyzeRequest, analyzer_pb.AnalyzeResponse>;
    analyzeStack: grpc.handleUnaryCall<analyzer_pb.AnalyzeStackRequest, analyzer_pb.AnalyzeResponse>;
    getAnalyzerInfo: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, analyzer_pb.AnalyzerInfo>;
    getPluginInfo: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, plugin_pb.PluginInfo>;
}

export interface IAnalyzerClient {
    analyze(request: analyzer_pb.AnalyzeRequest, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    analyze(request: analyzer_pb.AnalyzeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    analyze(request: analyzer_pb.AnalyzeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    analyzeStack(request: analyzer_pb.AnalyzeStackRequest, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    analyzeStack(request: analyzer_pb.AnalyzeStackRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    analyzeStack(request: analyzer_pb.AnalyzeStackRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    getAnalyzerInfo(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzerInfo) => void): grpc.ClientUnaryCall;
    getAnalyzerInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzerInfo) => void): grpc.ClientUnaryCall;
    getAnalyzerInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzerInfo) => void): grpc.ClientUnaryCall;
    getPluginInfo(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
}

export class AnalyzerClient extends grpc.Client implements IAnalyzerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public analyze(request: analyzer_pb.AnalyzeRequest, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    public analyze(request: analyzer_pb.AnalyzeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    public analyze(request: analyzer_pb.AnalyzeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    public analyzeStack(request: analyzer_pb.AnalyzeStackRequest, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    public analyzeStack(request: analyzer_pb.AnalyzeStackRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    public analyzeStack(request: analyzer_pb.AnalyzeStackRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzeResponse) => void): grpc.ClientUnaryCall;
    public getAnalyzerInfo(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzerInfo) => void): grpc.ClientUnaryCall;
    public getAnalyzerInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzerInfo) => void): grpc.ClientUnaryCall;
    public getAnalyzerInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: analyzer_pb.AnalyzerInfo) => void): grpc.ClientUnaryCall;
    public getPluginInfo(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    public getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
    public getPluginInfo(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: plugin_pb.PluginInfo) => void): grpc.ClientUnaryCall;
}
