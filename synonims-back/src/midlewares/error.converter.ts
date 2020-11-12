import { NextFunction, Request, Response } from 'express';
import { ApiError } from './errors/api.error';

export const errorConverter = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            code: err.code,
            message: err.message,
        })
    }
    next();
}