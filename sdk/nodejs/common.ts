export interface IdIntegration {
    id: number;
}

export interface HashIntegration {
    hash_id: string;
}

export type IntegrationRef = IdIntegration | HashIntegration;

export interface Variable {
    key: string;
    value: string;
    ssh_key?: boolean;
    settable?: boolean;
    encrypted?: boolean;
    defaults?: string;
}

export interface APKs {
    apk_path: string;
    main_expansion_path?: string;
    patch_expansion_path?: string;
}

export interface Replacement {
    replace_from: string;
    replace_to: string;
}

export interface Header {
    name: string;
    value: string;
}

export interface PipelineRef {
    id: number;
}

export type ServiceType = 'MYSQL' | 'MONGO_DB' | 'MARIADB' | 'POSTGRE_SQL' | 'REDIS' | 'MEMCACHED' | 'ELASTICSEARCH' | 'CUSTOM';

export interface Service {
    type: ServiceType;
    version: string;
    connection?: any;
}
