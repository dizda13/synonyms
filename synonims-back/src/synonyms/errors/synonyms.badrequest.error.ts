import httpStatus from 'http-status';
import { ApiError } from "../../midlewares/errors/api.error";

export class SynonymBadRequest extends ApiError {
    public statusCode: number = httpStatus.BAD_REQUEST;
    public code: "BAD_REQUEST" = "BAD_REQUEST";
    public message: string;

    constructor(errors: any[]) {
        super();
        this.message = JSON.stringify(errors);
    }
}