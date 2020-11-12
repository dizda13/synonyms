import dotenv from "dotenv-safe";
import path from "path";

dotenv.config({
  allowEmptyValues: true,
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example"),
});

export const appName = process.env.APP_NAME as string;
export const environment = process.env.NODE_ENV as string;
export const logs = process.env.NODE_ENV === "production" ? "combined" : "dev";
export const useHttps = process.env.USE_HTTPS === "true" ? true : false;
export const port = Number(process.env.PORT);
