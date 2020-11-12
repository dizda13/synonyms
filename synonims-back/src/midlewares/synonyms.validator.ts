import * as _ from "lodash";
import { body, param } from 'express-validator';
import SynonymsDao from '../synonyms/synonyms.dao';

export const getValidator = [
    param("word").isString(),
]

export const isWordStringValidator = param('word').isString()

export const bodySynonymsValidator = body('synonyms')
    .isArray()
    .custom((values: any[]) => _.every(values, (val: any) => typeof val === "string"))
    .optional(false);

export const bodyNewWordValidator = body('word')
    .isString()
    .custom((value: string) => !SynonymsDao.getWordTable().get(value))
    .optional(false);

export const paramWordExistsValidator = param('word')
    .isString()
    .custom((value: string) => SynonymsDao.getWordTable().get(value))
    .optional(false);