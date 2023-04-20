import { Response, Request, NextFunction } from 'express';

export interface IMiddleware {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}
