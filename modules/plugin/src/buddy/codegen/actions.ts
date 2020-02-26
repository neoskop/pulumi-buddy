import { Project, SourceFile, InterfaceDeclaration, TypeAliasDeclaration, StructureKind } from 'ts-morph';
import { Action, ParameterType } from '../scraper';

export interface ICodegenOptions {
    utilsImport: string;
    kindsImport: string;
    pipelineImport: string;
}

export class BuddyCodegenActions {
    protected readonly project = new Project();

    protected readonly options: ICodegenOptions;

    constructor(options: Partial<ICodegenOptions> = {}) {
        this.options = {
            utilsImport: '@neoskop/pulumi-buddy',
            kindsImport: '@neoskop/pulumi-buddy',
            pipelineImport: '@neoskop/pulumi-buddy',
            ...options
        };
        this.addCommon();
    }

    getFiles() {
        return this.project.getSourceFiles();
    }

    addIndexFile() {
        const file = this.project.createSourceFile('index.ts');

        const states: InterfaceDeclaration[] = [];
        const args: TypeAliasDeclaration[] = [];
        const props: InterfaceDeclaration[] = [];

        function getImp(f: SourceFile) {
            let imp = file.getImportDeclaration(d => d.getModuleSpecifierValue() === `./${f.getBaseNameWithoutExtension()}`);
            if(!imp) {
                imp = file.addImportDeclaration({
                    moduleSpecifier: `./${f.getBaseNameWithoutExtension()}`
                });
            }

            return imp;
        }

        for (const f of this.getFiles()) {
            file.addExportDeclaration({
                moduleSpecifier: `./${f.getBaseNameWithoutExtension()}`
            });
            for(const i of f.getInterfaces()) {
                if(i.getName().endsWith('State')) {
                    states.push(i);
                    getImp(f).addNamedImport(i.getName());
                } else if(i.getName().endsWith('Props')) {
                    props.push(i);
                    getImp(f).addNamedImport(i.getName());
                }
            }
            for(const t of f.getTypeAliases()) {
                if(t.getName().endsWith('Args')) {
                    args.push(t);
                    getImp(f).addNamedImport(t.getName());
                }
            }
        }

        file.addTypeAlias({
            name: 'BuddyActionState',
            isExported: true,
            type: states.map(s => s.getName()).join(' | ')
        });

        file.addTypeAlias({
            name: 'BuddyActionArgs',
            isExported: true,
            type: args.map(s => s.getName()).join(' | ')
        });

        file.addTypeAlias({
            name: 'BuddyActionProps',
            isExported: true,
            type: props.map(s => s.getName()).join(' | ')
        });
    }

    protected addCommon() {
        const common = this.project.createSourceFile('common.ts');

        const idIntegration = common.addInterface({
            name: 'IdIntegration',
            isExported: true,
            properties: [
                {
                    name: 'id',
                    type: 'number'
                }
            ]
        });

        const hashIntegration = common.addInterface({
            name: 'HashIntegration',
            isExported: true,
            properties: [
                {
                    name: 'hash_id',
                    type: 'string'
                }
            ]
        });

        common.addTypeAlias({
            name: 'Integration',
            isExported: true,
            type: `${idIntegration.getName()} | ${hashIntegration.getName()}`
        });

        common.addInterface({
            name: 'Variable',
            isExported: true,
            properties: [
                {
                    name: 'key',
                    type: 'string'
                },
                {
                    name: 'value',
                    type: 'string'
                }
            ]
        });

        common.addInterface({
            name: 'APKs',
            isExported: true,
            properties: [
                {
                    name: 'apk_path',
                    type: 'string'
                },
                {
                    name: 'main_expansion_path',
                    hasQuestionToken: true,
                    type: 'string'
                },
                {
                    name: 'patch_expansion_path',
                    hasQuestionToken: true,
                    type: 'string'
                }
            ]
        });

        common.addInterface({
            name: 'Replacement',
            isExported: true,
            properties: [
                {
                    name: 'replace_from',
                    type: 'string'
                },
                {
                    name: 'replace_to',
                    type: 'string'
                }
            ]
        });

        common.addInterface({
            name: 'Header',
            isExported: true,
            properties: [
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'value',
                    type: 'string'
                }
            ]
        });

        common.addInterface({
            name: 'Pipeline',
            isExported: true,
            properties: [
                {
                    name: 'id',
                    type: 'number'
                }
            ]
        });

        const serviceTypes = common.addTypeAlias({
            name: 'ServiceType',
            isExported: true,
            type: '"MYSQL" | "MONGO_DB" | "MARIADB" | "POSTGRE_SQL" | "REDIS" | "MEMCACHED" | "ELASTICSEARCH" | "CUSTOM"'
        });

        common.addInterface({
            name: 'Service',
            isExported: true,
            properties: [
                {
                    name: 'type',
                    type: serviceTypes.getName()
                },
                {
                    name: 'version',
                    type: 'string'
                },
                {
                    name: 'connection',
                    hasQuestionToken: true,
                    type: 'any'
                }
            ]
        });
    }

    protected toFileName(str: string) {
        return str
            .replace(/ +/g, '-')
            .replace(/[^\w-]/g, '')
            .toLowerCase();
    }

    protected toKeyword(str: string) {
        return str.replace(/[^\w-]/g, '');
    }

    toTsType(type: ParameterType, file: SourceFile) {
        if ('ref' in type) {
            let imp = file.getImportDeclaration(d => d.getModuleSpecifierValue() === './common');
            if (!imp) {
                imp = file.addImportDeclaration({
                    moduleSpecifier: './common'
                });
            }
            if (!imp.getNamedImports().some(i => i.getName() === type.ref)) {
                imp.addNamedImport(type.ref);
            }

            return type.isArray ? `${type.ref}[]` : type.ref;
        }
        if ('scalar' in type) {
            return type.isArray ? `${type.scalar.toLowerCase()}[]` : type.scalar.toLowerCase();
        }
        const t = type.text.map(t => `"${t}"`).join(' | ');

        return type.isArray ? `(${t})[]` : t;
    }

    addAction(action: Action) {
        const file = this.project.createSourceFile(`${this.toFileName(action.name)}.ts`);
        this.addDefaultImports(file);
        const state = this.addActionState(action, file);
        const args = this.addActionArgs(action, state);
        const props = this.addActionProps(action, file);
        this.addActionClass(action, file, state, props, args);
    }

    protected addDefaultImports(file: SourceFile) {
        file.addImportDeclaration({
            moduleSpecifier: this.options.utilsImport,
            namedImports: ['AsInputs']
        });
        file.addImportDeclaration({
            moduleSpecifier: this.options.kindsImport,
            namedImports: ['Kind']
        });
        file.addImportDeclaration({
            moduleSpecifier: this.options.pipelineImport,
            namedImports: ['BuddyPipelineProps']
        });

        file.addImportDeclaration({
            moduleSpecifier: '@pulumi/pulumi',
            namedImports: ['CustomResource', 'Input', 'Output', 'ID', 'CustomResourceOptions', 'Inputs']
        });
    }

    protected addActionState(action: Action, file: SourceFile) {
        const state = file.addInterface({
            name: `BuddyAction${this.toKeyword(action.name)}State`,
            isExported: true,
            properties: [
                {
                    name: 'project_name',
                    type: 'string'
                },
                {
                    name: 'pipeline_id',
                    type: 'number'
                }
            ]
        });

        let first = true;

        for (const param of action.parameters) {
            if (param.name === 'type') continue;
            const prop = state.addProperty({
                name: param.name,
                hasQuestionToken: !param.required,
                type: this.toTsType(param.type, file),
                docs: [`\n${param.description}`]
            });

            if (!first) {
                prop.prependWhitespace('\n');
            }

            first = false;
        }

        return state;
    }

    protected addActionArgs(action: Action, state: InterfaceDeclaration) {
        return state.getSourceFile().addTypeAlias({
            name: `BuddyAction${this.toKeyword(action.name)}Args`,
            isExported: true,
            type: `AsInputs<${state.getName()}>`
        });
    }

    protected addActionProps(action: Action, file: SourceFile) {
        const props = file.addInterface({
            name: `BuddyAction${this.toKeyword(action.name)}Props`,
            isExported: true
        });

        props.addProperties([
            {
                name: 'url',
                type: 'string'
            },
            {
                name: 'html_url',
                type: 'string'
            },
            {
                name: 'id',
                type: 'number'
            }
        ]);

        for (const param of action.parameters) {
            props.addProperty({
                name: param.name,
                hasQuestionToken: !param.required,
                type: this.toTsType(param.type, file)
            });
        }

        props.addProperty({
            name: 'pipeline',
            type: 'BuddyPipelineProps'
        })

        // @TODO: add pipeline output

        return props;
    }

    protected addActionClass(
        action: Action,
        file: SourceFile,
        state: InterfaceDeclaration,
        props: InterfaceDeclaration,
        args: TypeAliasDeclaration
    ) {
        const actionClass = file.addClass({
            name: `BuddyAction${this.toKeyword(action.name)}`,
            isExported: true,
            extends: 'CustomResource'
        });

        actionClass.addProperty({
            name: '__pulumiType',
            isStatic: true,
            initializer: `'buddy:index/action:${actionClass.getName()}'`
        });

        actionClass.addMethod({
            name: 'get',
            isStatic: true,
            parameters: [
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'id',
                    type: 'Input<ID>'
                },
                {
                    name: 'state',
                    hasQuestionToken: true,
                    type: `Partial<${state.getName()}>`
                },
                {
                    name: 'opts',
                    hasQuestionToken: true,
                    type: 'CustomResourceOptions'
                }
            ],
            statements: [`return new ${actionClass.getName()}(name, state as any, { ...opts, id });`]
        });

        actionClass.addMethod({
            name: 'isInstance',
            isStatic: true,
            parameters: [{ name: 'obj', type: 'any' }],
            returnType: `obj is ${actionClass.getName()}`,
            statements: [
                'if(null == obj) {',
                '  return false;',
                '}',
                `return obj['__pulumiType'] === ${actionClass.getName()}.__pulumiType;`
            ]
        });

        const kind = actionClass.addProperty({
            name: 'kind',
            hasExclamationToken: true,
            type: 'Output<Kind.Action>'
        });

        actionClass.addProperty({
            name: 'project_name',
            hasExclamationToken: true,
            type: 'Output<string>'
        });

        actionClass.addProperty({
            name: 'pipeline_id',
            hasExclamationToken: true,
            type: 'Output<number>'
        });

        for (const param of action.parameters) {
            actionClass.addProperty({
                name: param.name,
                hasExclamationToken: true,
                type: `Output<${this.toTsType(param.type, file)}${param.required ? '' : ' | undefined'}>`
            });
        }

        const outputs = actionClass.addProperty({
            name: 'outputs',
            hasExclamationToken: true,
            type: `Output<${props.getName()}>`
        });
        kind.appendWhitespace('\n');
        outputs.prependWhitespace('\n');

        const stateAdaption: string[] = [];
        const argsChecks: string[] = [];
        const argsAdaption: string[] = [];

        for (const param of action.parameters) {
            if (param.name === 'type') continue;
            stateAdaption.push(`inputs['${param.name}'] = state?.${param.name};`);
            if (param.required) {
                argsChecks.push(`if (!args?.${param.name}) {`, `  throw new Error('Missing required property "${param.name}"')`, `}`);
            }
            argsAdaption.push(`inputs['${param.name}'] = args.${param.name};`);
        }

        actionClass.addConstructor({
            parameters: [
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'argsOrState',
                    type: `${args.getName()} | ${state.getName()}`
                },
                {
                    name: 'opts',
                    hasQuestionToken: true,
                    type: 'CustomResourceOptions'
                }
            ],
            statements: [
                'const inputs: Inputs = {};',
                'if (!opts) {',
                '  opts = {};',
                '}',
                'if(opts.id) {',
                `  const state = argsOrState as ${state.getName()} | undefined;`,
                `  inputs['project_name'] = state?.project_name;`,
                `  inputs['pipeline_id'] = state?.pipeline_id;`,
                ...stateAdaption.map(r => `  ${r}`),
                '} else {',
                `  const args = argsOrState as ${args.getName()} | undefined;`,
                `  if(!args?.project_name) {`,
                `    throw new Error('Missing required property "project_name"');`,
                `  }`,
                `  if(!args?.pipeline_id) {`,
                `    throw new Error('Missing required property "pipeline_id"');`,
                `  }`,
                ...argsChecks.map(r => `  ${r}`),
                ...argsAdaption.map(r => `  ${r}`),
                `  inputs['project_name'] = args.project_name;`,
                `  inputs['pipeline_id'] = args.pipeline_id;`,
                '}',
                'if (!opts.version) {',
                "  opts.version = require('../package').version;",
                '}',
                `opts.ignoreChanges = ['project_name', 'pipeline_id', 'after_action_id', ...(opts.ignoreChanges || [])];`,
                '',
                'inputs.kind = Kind.Action',
                `inputs.type = "${action.type}"`,
                'inputs.outputs = undefined',
                '',
                `super(${actionClass.getName()}.__pulumiType, name, inputs, opts)`
            ]
        });
    }
}
