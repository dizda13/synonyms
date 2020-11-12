import httpStatus from 'http-status';
import { ApiError } from './api.error';

export class InternalServerError extends ApiError {
    public statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
    public code: "INTERNAL_SERVER_ERROR" = "INTERNAL_SERVER_ERROR";
    public message: string = `Internal server error`;
}