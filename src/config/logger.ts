import winston, { format } from "winston";
import { Config } from ".";

const logger = winston.createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: { service: "auth-service" },
    transports: [
        new winston.transports.File({
            level: "info",
            dirname: "logs",
            filename: "combined.log",
            silent: Config.NODE_ENV === "dev" || false,
        }),
        new winston.transports.File({
            level: "error",
            dirname: "logs",
            filename: "error.log",
            silent: Config.NODE_ENV === "dev" || false,
        }),
        new winston.transports.File({
            level: "debug",
            dirname: "logs",
            filename: "debug.log",
            silent: Config.NODE_ENV === "dev" || false,
        }),
        new winston.transports.Console(),
    ],
});

export default logger;
