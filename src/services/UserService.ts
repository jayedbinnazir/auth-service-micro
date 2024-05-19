import { Repository } from "typeorm";
import { User } from "../entity/User";
import { UserData } from "../types";
import createHttpError from "http-errors";
import { Roles } from "../const";
import bcrypt from "bcrypt";

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        if (user) {
            const err = createHttpError(
                400,
                "user with this email allready exists",
            );
            throw err;
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        try {
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            });
        } catch (err) {
            const error = createHttpError(
                500,
                "error storing the user in the database",
            );
            throw error;
        }
    }

    // async findId() {
    //     try {
    //         const users = await this.userRepository.find();
    //         return users[0].id;
    //     } catch (err) {
    //         const error = createHttpError(500, "error finding the userdata");
    //         throw error;
    //     }
    // }
}
