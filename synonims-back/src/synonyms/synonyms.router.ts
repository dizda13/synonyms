import express from "express";
import { validator } from '../midlewares/api.validator';
import synonymsController from './synonyms.controller';
import {
    bodyNewWordValidator,
    bodysynonymsValidator,
    isWordStringValidator,
    paramWordExistsValidator
} from '../midlewares/synonyms.validator';

export const router = express.Router();

router.route("/synonyms/:word")
    .get([
        isWordStringValidator,
        validator
    ], synonymsController.get);

router.route("/synonyms")
    .post([
        bodyNewWordValidator,
        bodysynonymsValidator,
        validator,
    ], synonymsController.post);

router.route("/synonyms/:word")
    .patch([
        paramWordExistsValidator,
        bodysynonymsValidator,
        validator,
    ], synonymsController.patch)

router.route("/synonyms/:word")
    .delete([
        isWordStringValidator,
    ], synonymsController.delete)