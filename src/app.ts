import express, { Request, Response } from "express";

const app = express();

//routing

app.get("/", (req: Request, res: Response) => {
    res.render("<h1>welcome to microservice</h1>");
});

export default app;
