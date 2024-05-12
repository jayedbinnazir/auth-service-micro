import { config } from "dotenv";
import path from "node:path";

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
config({ path: path.join(__dirname + `../../.env.${process.env.NODE_ENV}`) });

const { PORT, NODE_ENV, DB_HOST, DB_NAME, DB_PORT, DB_USERNAME, DB_PASSWORD } =
    process.env;

export const Config = {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
};
