import Bluebird from "bluebird";
import "reflect-metadata";
Promise = Bluebird as any;

import { appName, environment } from "@config/vars";
import { logger } from './common/Logger';

(async () => {
  logger.info(`Starting ${appName} (${environment})`);
  (await import("./config/server")).startServer();
})().catch((error) => {
  logger.error(`Failed to start ${appName} (${environment})`);
  logger.error(error);
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info(`Shutting down ${appName} (${environment})`);
  process.exit(0);
});