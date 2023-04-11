import { injectable } from "inversify";
import { Logger, ILogObj } from "tslog";
import { ILogger } from "./logger.interface";
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
    public logger: Logger<ILogObj>;

    constructor() {
        this.logger = new Logger<ILogObj>()
    }

    log(...args: unknown[]) {
        this.logger.info(...args);
    }

    error(...args: unknown[]) {
        this.logger.error(...args)
    }

    warn(...args: unknown[]) {
        this.logger.warn(...args)
    }
}