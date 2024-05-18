import { Repository } from "typeorm";
import { User } from "../entity/User";
import { UserData } from "../types";
import createHttpError from "http-errors";

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        try {
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password,
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
