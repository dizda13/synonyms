import httpStatus from 'http-status';
import { ApiError } from "../../midlewares/errors/api.error";

export class synonymNotFound extends ApiError {
    public statusCode: number = httpStatus.NOT_FOUND;
    public code: "synonym_NOT_FOUND" = "synonym_NOT_FOUND";
    public message: string;

    constructor(word: string) {
        super();
        this.message = `synonyms for word ${word} not found`;
    }
}