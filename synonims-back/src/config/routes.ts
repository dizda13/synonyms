import express from "express";
import httpStatus from 'http-status';
import { router as SynonymsRouter } from '../synonyms/synonyms.router';

export const router = express.Router();

router.get("/status", (req, res) => res.status(httpStatus.OK));

router.use(SynonymsRouter);