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
            silent: Config.NODE_ENV === "development" || false,
        }),
        new winston.transports.File({
            level: "error",
            dirname: "logs",
            filename: "error.log",
            silent: Config.NODE_ENV === "development" || false,
        }),
        new winston.transports.Console(),
    ],
});

export default logger;
