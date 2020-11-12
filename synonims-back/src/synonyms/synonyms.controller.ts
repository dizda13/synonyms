import { NextFunction, Request, Response } from 'express';
import httpStatus from "http-status";
import { synonymsStandardService } from './synonyms-standard.service';
import { InternalServerError } from '../midlewares/errors/internal.error';
import { synonymNotFound } from './errors/synonym.notfound.error';
import { TryCatch } from '../common/try-catch-decorator';
import { logger } from 'src/common/Logger';

export class synonymsController {
    private synonymsService: synonymsStandardService;
    constructor() {
        this.synonymsService = new synonymsStandardService();
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.post = this.post.bind(this);
        this.patch = this.patch.bind(this);
    };

    @TryCatch()
    async get(req: Request, res: Response, next: NextFunction) {
        const { word } = req.params;
        logger.info("get: fetch synonyms started", { word });

        const synonyms: string[] | undefined = this.synonymsService.getsynonym(word);

        if (synonyms !== undefined) {
            logger.info("get: fetch synonyms sucess", { word });

            return res
                .status(httpStatus.OK)
                .json({ word, synonyms });
        }

        return next(new synonymNotFound(word));
    }

    @TryCatch()
    async delete(req: Request, res: Response, next: NextFunction) {
        const { word } = req.params;
        logger.info("delete: delete synonym started", { word });

        const synonyms: string[] | undefined = this.synonymsService.deletesynonym(word);

        if (synonyms !== undefined) {
            logger.info("delete: synonym deleted", { word, synonyms });

            return res
                .status(httpStatus.OK)
                .json({ word, synonyms });
        }

        return next(new synonymNotFound(word));
    }

    @TryCatch()
    async post(req: Request, res: Response, next: NextFunction) {
        const { word, synonyms } = req.body;
        logger.info("post: create synonym started", { word, synonyms });

        synonyms.push(word);
        const allsynonyms: string[] | undefined = this.synonymsService.addNewWords(synonyms);

        if (allsynonyms !== undefined) {
            logger.info("post: create synonym success", { word, allsynonyms });
            return res
                .status(httpStatus.CREATED)
                .json({ word, synonyms: allsynonyms });
        }

        return next(new InternalServerError());
    }

    @TryCatch()
    async patch(req: Request, res: Response, next: NextFunction) {
        const { word } = req.params;
        const { synonyms } = req.body;
        logger.info("patch: create synonym started", { word, synonyms });
    
        synonyms.push(word);

        const allsynonyms: string[] | undefined = this.synonymsService.addNewWords(synonyms);

        if (allsynonyms !== undefined) {
            logger.info("patch: update synonym success", { word, allsynonyms });
            return res
                .status(httpStatus.OK)
                .json({ word, synonyms: allsynonyms });
        }

        return next(new InternalServerError());
    }
}

export default new synonymsController()