import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from './users.service.interface';
@injectable()
export class UserController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRouter([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middleware: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middleware: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middleware: [],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (!result) {
			return next(new HTTPError(401, 'Auth error', 'login'));
		}
		console.log(this.configService.get('SECRET'));

		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));
		this.ok(res, { jwt });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'User already created'));
		}
		this.ok(res, { email: result.email, name: result.name });
	}

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, { email: req.user });
	}

	private async signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}

					resolve(token as string);
				},
			);
		});
	}
}
