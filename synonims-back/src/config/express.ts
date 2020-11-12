import express from "express";
import morgan from "morgan";
import cors from "cors";
import methodOverride from "method-override";
import helmet from "helmet";
import bodyParser from "body-parser";
import { router } from "./routes";
import { errorConverter } from '../midlewares/error.converter';
import timeout = require("connect-timeout")
import { logs } from './vars';

export const app = express();

app.use(timeout("30s"))
app.use(morgan(logs)); // request logging - dev: console | production: file
app.use(methodOverride()); // lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
app.use(helmet()); // secure apps by setting various HTTP headers
app.use(cors()); // enable CORS - Cross Origin Resource Sharing
app.use(bodyParser.json()); // parse body params and attach them to req.body when Content-Type is JSON
app.use(bodyParser.urlencoded({ extended: true })); // parse body params and attach them to req.body when Content-Type is urlEncoded
app.use("/api", router);

app.use(errorConverter);
