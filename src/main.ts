import { Container } from "inversify";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";

// async function bootstrap() {
//     const logger = new LoggerService()
//     const app = new App(
//         logger,
//         new UserController(logger),
//         new ExceptionFilter(logger)

//     )
//     await app.init()
// }

const appContainer = new Container()
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application)
app.init()

export { app, appContainer }