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

export interface Tag {
    key: string;
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

export interface ExcludedArea {
    url: string;
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
}

export interface Screenshot {
    url: string;
    baseline: string;
    headers: Header[];
    excluded_areas: ExcludedArea[];
}

export type EventType = 'PUSH';
export interface Event {
    type: EventType;
    refs: string[];
}

export type TriggerType =
    | 'ALWAYS'
    | 'ON_CHANGE'
    | 'ON_CHANGE_AT_PATH'
    | 'VAR_IS'
    | 'VAR_IS_NOT'
    | 'VAR_CONTAINS'
    | 'VAR_NOT_CONTAINS'
    | 'DATETIME'
    | 'SUCCESS_PIPELINE';

export interface TriggerCondition {
    trigger_condition: TriggerType;
    trigger_condition_paths?: string[];
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    trigger_hours?: number[];
    trigger_days?: number[];
    zone_id?: string;
    trigger_project_name?: string;
    trigger_pipeline_name?: string;
}

export type SyncPathDirection = 'PIPELINE_TO_VM' | 'VM_TO_PIPELINE';
export interface SyncPath {
    pipeline_path: string;
    vm_path: string;
    direction: SyncPathDirection;
}
