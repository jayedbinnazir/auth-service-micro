import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import logger from "./config/logger";
import authRouter from "./routes/auth";
import "reflect-metadata";

const app = express();

app.use(express.json());

//routing

// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.send("<h1>welcome to microservice</h1>");
});

//Registration
app.use("/auth", authRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
//     if (err instanceof HttpError) {
//         logger.error(err.message);
//         const statusCode = err.statusCode || 500;
//         res.status(statusCode).json({
//             errors: [
//                 {
//                     type: err.name,
//                     msg: err.message,
//                     location: "",
//                     path: "",
//                 },
//             ],
//         });
//     }
// });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                location: "",
                path: "",
            },
        ],
    });
});

export default app;
