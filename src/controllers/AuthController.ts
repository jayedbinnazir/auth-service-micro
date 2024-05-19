import { NextFunction, Response } from "express";
import { RegisterRequest } from "../types";
import { UserService } from "../services/UserService";
import { Logger } from "winston";
import { validationResult } from "express-validator";
// import createHttpError from "http-errors";

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {
        this.userService = userService;
    }

    async register(req: RegisterRequest, res: Response, next: NextFunction) {
        const { firstName, lastName, email, password } = req.body;

        // if(!email){
        //     const err = createHttpError(400 , "Email is required")
        //     next(err)
        //     return
        // }

        //validation
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        this.logger.debug("New request to register a user", {
            firstName,
            lastName,
            email,
            password: "*******",
        });

        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });
            this.logger.info("user is succeefully registerd", { id: user.id });
            //query and find the user

            res.status(201).json({ userId: user.id });
        } catch (err) {
            next(err);
            return;
        }
    }
}
