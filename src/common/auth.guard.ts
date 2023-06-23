import { IMiddleware } from './middleware.interface';
import { Response, Request, NextFunction } from 'express';

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}

		res.status(401).send({ error: 'You are not authorized' });
	}
}
