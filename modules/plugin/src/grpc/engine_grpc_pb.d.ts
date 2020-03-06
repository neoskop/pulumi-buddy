// package: pulumirpc
// file: engine.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as engine_pb from "./engine_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IEngineService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    log: IEngineService_ILog;
    getRootResource: IEngineService_IGetRootResource;
    setRootResource: IEngineService_ISetRootResource;
}

interface IEngineService_ILog extends grpc.MethodDefinition<engine_pb.LogRequest, google_protobuf_empty_pb.Empty> {
    path: string; // "/pulumirpc.Engine/Log"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<engine_pb.LogRequest>;
    requestDeserialize: grpc.deserialize<engine_pb.LogRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IEngineService_IGetRootResource extends grpc.MethodDefinition<engine_pb.GetRootResourceRequest, engine_pb.GetRootResourceResponse> {
    path: string; // "/pulumirpc.Engine/GetRootResource"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<engine_pb.GetRootResourceRequest>;
    requestDeserialize: grpc.deserialize<engine_pb.GetRootResourceRequest>;
    responseSerialize: grpc.serialize<engine_pb.GetRootResourceResponse>;
    responseDeserialize: grpc.deserialize<engine_pb.GetRootResourceResponse>;
}
interface IEngineService_ISetRootResource extends grpc.MethodDefinition<engine_pb.SetRootResourceRequest, engine_pb.SetRootResourceResponse> {
    path: string; // "/pulumirpc.Engine/SetRootResource"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<engine_pb.SetRootResourceRequest>;
    requestDeserialize: grpc.deserialize<engine_pb.SetRootResourceRequest>;
    responseSerialize: grpc.serialize<engine_pb.SetRootResourceResponse>;
    responseDeserialize: grpc.deserialize<engine_pb.SetRootResourceResponse>;
}

export const EngineService: IEngineService;

export interface IEngineServer {
    log: grpc.handleUnaryCall<engine_pb.LogRequest, google_protobuf_empty_pb.Empty>;
    getRootResource: grpc.handleUnaryCall<engine_pb.GetRootResourceRequest, engine_pb.GetRootResourceResponse>;
    setRootResource: grpc.handleUnaryCall<engine_pb.SetRootResourceRequest, engine_pb.SetRootResourceResponse>;
}

export interface IEngineClient {
    log(request: engine_pb.LogRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    log(request: engine_pb.LogRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    log(request: engine_pb.LogRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    getRootResource(request: engine_pb.GetRootResourceRequest, callback: (error: grpc.ServiceError | null, response: engine_pb.GetRootResourceResponse) => void): grpc.ClientUnaryCall;
    getRootResource(request: engine_pb.GetRootResourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: engine_pb.GetRootResourceResponse) => void): grpc.ClientUnaryCall;
    getRootResource(request: engine_pb.GetRootResourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: engine_pb.GetRootResourceResponse) => void): grpc.ClientUnaryCall;
    setRootResource(request: engine_pb.SetRootResourceRequest, callback: (error: grpc.ServiceError | null, response: engine_pb.SetRootResourceResponse) => void): grpc.ClientUnaryCall;
    setRootResource(request: engine_pb.SetRootResourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: engine_pb.SetRootResourceResponse) => void): grpc.ClientUnaryCall;
    setRootResource(request: engine_pb.SetRootResourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: engine_pb.SetRootResourceResponse) => void): grpc.ClientUnaryCall;
}

export class EngineClient extends grpc.Client implements IEngineClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public log(request: engine_pb.LogRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public log(request: engine_pb.LogRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public log(request: engine_pb.LogRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public getRootResource(request: engine_pb.GetRootResourceRequest, callback: (error: grpc.ServiceError | null, response: engine_pb.GetRootResourceResponse) => void): grpc.ClientUnaryCall;
    public getRootResource(request: engine_pb.GetRootResourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: engine_pb.GetRootResourceResponse) => void): grpc.ClientUnaryCall;
    public getRootResource(request: engine_pb.GetRootResourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: engine_pb.GetRootResourceResponse) => void): grpc.ClientUnaryCall;
    public setRootResource(request: engine_pb.SetRootResourceRequest, callback: (error: grpc.ServiceError | null, response: engine_pb.SetRootResourceResponse) => void): grpc.ClientUnaryCall;
    public setRootResource(request: engine_pb.SetRootResourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: engine_pb.SetRootResourceResponse) => void): grpc.ClientUnaryCall;
    public setRootResource(request: engine_pb.SetRootResourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: engine_pb.SetRootResourceResponse) => void): grpc.ClientUnaryCall;
}
