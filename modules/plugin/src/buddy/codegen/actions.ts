import { InterfaceDeclaration, Project, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { Action, ParameterType } from '../scraper';

export interface ICodegenOptions {
    utilsImport: string;
    commonImport: string;
    pipelineImport: string;
}

export class BuddyCodegenActions {
    protected readonly project = new Project();

    protected readonly options: ICodegenOptions;

    constructor(options: Partial<ICodegenOptions> = {}) {
        this.options = {
            utilsImport: '@neoskop/pulumi-buddy',
            commonImport: '@neoskop/pulumi-buddy',
            pipelineImport: '@neoskop/pulumi-buddy',
            ...options
        };
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
            if (!imp) {
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
            for (const i of f.getInterfaces()) {
                if (i.getName().endsWith('State')) {
                    states.push(i);
                    getImp(f).addNamedImport(i.getName());
                } else if (i.getName().endsWith('Props')) {
                    props.push(i);
                    getImp(f).addNamedImport(i.getName());
                }
            }
            for (const t of f.getTypeAliases()) {
                if (t.getName().endsWith('Args')) {
                    args.push(t);
                    getImp(f).addNamedImport(t.getName());
                }
            }
        }

        file.addTypeAlias({
            name: 'ActionState',
            isExported: true,
            type: states.map(s => s.getName()).join(' | ')
        });

        file.addTypeAlias({
            name: 'ActionArgs',
            isExported: true,
            type: args.map(s => s.getName()).join(' | ')
        });

        file.addTypeAlias({
            name: 'ActionProps',
            isExported: true,
            type: props.map(s => s.getName()).join(' | ')
        });
    }

    protected toFileName(str: string) {
        return str
            .replace(/ +/g, '-')
            .replace(/[^\w-]/g, '')
            .toLowerCase();
    }

    protected toKeyword(str: string) {
        return str.replace(/ [a-z]/g, str => str.toUpperCase()).replace(/[^\w-]/g, '');
    }

    toTsType(type: ParameterType, file: SourceFile) {
        if ('ref' in type) {
            let ref = type.ref;

            if (['Pipeline', 'Integration'].includes(ref)) {
                ref = `${ref}Ref`;
            }

            let imp = file.getImportDeclaration(d => d.getModuleSpecifierValue() === this.options.commonImport);
            if (!imp) {
                imp = file.addImportDeclaration({
                    moduleSpecifier: this.options.commonImport
                });
            }
            if (!imp.getNamedImports().some(i => i.getName() === ref)) {
                imp.addNamedImport(ref);
            }

            return type.isArray ? `${ref}[]` : ref;
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
            moduleSpecifier: this.options.pipelineImport,
            namedImports: ['PipelineProps']
        });

        file.addImportDeclaration({
            moduleSpecifier: '@pulumi/pulumi',
            namedImports: ['CustomResource', 'Input', 'Output', 'ID', 'CustomResourceOptions', 'Inputs']
        });
    }

    protected addActionState(action: Action, file: SourceFile) {
        const state = file.addInterface({
            name: `Action${this.toKeyword(action.name)}State`,
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
            name: `Action${this.toKeyword(action.name)}Args`,
            isExported: true,
            type: `AsInputs<${state.getName()}>`
        });
    }

    protected addActionProps(action: Action, file: SourceFile) {
        const props = file.addInterface({
            name: `Action${this.toKeyword(action.name)}Props`,
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
                name: 'action_id',
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
            type: 'PipelineProps'
        });

        props.addProperty({
            name: 'project_name',
            type: 'string'
        });

        props.addProperty({
            name: 'pipeline_id',
            type: 'number'
        });

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
            name: `Action${this.toKeyword(action.name)}`,
            isExported: true,
            extends: 'CustomResource',
            docs: [
                `\nRequired scopes in Buddy API: \`WORKSPACE\`, \`EXECUTION_MANAGE\`, \`EXECUTION_INFO\``
            ]
        });

        actionClass.addProperty({
            name: '__pulumiType',
            isStatic: true,
            initializer: `'buddy:action:${actionClass.getName()}'`
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

        actionClass.addProperty({
            name: 'action_id',
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
                `opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];`,
                '',
                `inputs['type'] = "${action.type}";`,
                `inputs['url'] = undefined;`,
                `inputs['html_url'] = undefined;`,
                `inputs['action_id'] = undefined;`,
                '',
                `super(${actionClass.getName()}.__pulumiType, name, inputs, opts)`
            ]
        });
    }
}
