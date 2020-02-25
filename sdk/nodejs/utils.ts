import { Output, Input } from '@pulumi/pulumi';

export type AsOutputs<T extends {}> = { 
    [K in keyof T]: Output<T[K]>
}

export type AsInputs<T extends {}> = {
    [K in keyof T]: T[K] extends {} ? Input<AsInputs<T[K]>> : Input<T[K]>
}