import { IMiddleware } from './middleware.interface';
import { Response, Request, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);

		validate(instance).then((err) => {
			if (err.length) {
				res.status(422).send(err);
			} else {
				next();
			}
		});
	}
}
