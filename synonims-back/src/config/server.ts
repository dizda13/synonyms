import fs from "fs";
import http from "http";
import https from "https";
import path from "path";
import { logger } from 'src/common/Logger';

import { app } from "../config/express";

import { port, useHttps } from './vars';

const server = useHttps
    ? https.createServer(
        {
            key: fs.readFileSync(path.join(__dirname, "../../ssl/etesian.key")),
            cert: fs.readFileSync(path.join(__dirname, "../../ssl/etesian.cert")),
        },
        app
    )
    : http.createServer(app);

export const startServer = () =>
    server
        .listen(port, () => logger.error(`Express running on port ${port}`))
        .on("error", (error) => {
            logger.error(`Express failed with error`, error)
        });
