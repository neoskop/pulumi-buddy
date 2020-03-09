import { Metadata, ServiceError as IServiceError, status } from '@grpc/grpc-js';

export class ServiceError extends Error implements IServiceError {
    public readonly metadata!: Metadata;
    public readonly details!: string;

    constructor(message: string, public readonly code: status = status.UNKNOWN, metadata?: Metadata, details?: string) {
        super(message);
        if(metadata) this.metadata = metadata;
        if(details) this.details = details;
    }
}