import httpStatus from 'http-status';
import { ApiError } from "../../midlewares/errors/api.error";

export class SynonymNotFound extends ApiError {
    public statusCode: number = httpStatus.NOT_FOUND;
    public code: "SYNONYM_NOT_FOUND" = "SYNONYM_NOT_FOUND";
    public message: string;

    constructor(word: string) {
        super();
        this.message = `Synonyms for word ${word} not found`;
    }
}