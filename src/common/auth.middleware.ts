import { NextFunction, Response, Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, { email }: any) => {
				if (err) {
					next();
				} else if (email) {
					req.user = email;
					next();
				}
			});
		}
		next();
	}
}
