import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { SynonymBadRequest } from '../synonyms/errors/synonyms.badrequest.error';

export const validator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        throw new SynonymBadRequest(errors.array());
    }
    next();
}