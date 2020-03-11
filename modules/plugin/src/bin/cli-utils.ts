import * as chalk from 'chalk';

export function error(str: string): never {
    console.error(chalk.red(str));
    process.exit(1);
}

export function success(str: string) {
    console.log(chalk.green(str));
}

export function warn(str: string) {
    console.warn(chalk.yellow(str));
}

export function info(name: string, info?: string) {
    if (info) {
        console.log(chalk.blue(name), chalk.gray(info));
    } else {
        console.log(chalk.blue(name));
    }
}

export function step(name: string, info?: string) {
    console.log();
    if (info) {
        console.log(chalk.cyan.bold(name), chalk.gray(info));
    } else {
        console.log(chalk.cyan.bold(name));
    }
}
