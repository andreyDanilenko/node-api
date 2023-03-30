import { Logger, ILogObj } from "tslog";

export class LoggerService {
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