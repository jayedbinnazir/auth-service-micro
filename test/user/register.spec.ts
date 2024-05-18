import request from "supertest";
import app from "../../src/app";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";
import { truncateTable } from "../user/utils/index";
import { User } from "../../src/entity/User";

describe("POST /auth/register", () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        //truncated database
        await truncateTable(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    describe("Given All Fields", () => {
        it("should return 201 statusCode", async () => {
            //AAA
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "thedeno",
            };
            //Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            //Assert
            expect(response.statusCode).toBe(201);
        });

        it("should return valid json", async () => {
            //AAA
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "thedeno",
            };
            //Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            //Assert
            expect(
                (response.headers as Record<string, string>)["content-type"],
            ).toEqual(expect.stringContaining("json"));
        });

        it("should persists the user in the database", async () => {
            //AAA
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "thedeno",
            };
            //Act
            await request(app).post("/auth/register").send(userData);

            //Assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users).toHaveLength(1);
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
            expect(users[0].password).toBe(userData.password);
        });

        it("should return userId", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "thedeno",
            };
            //act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            //assert
            console.log(response.body);
            expect(response.body).toHaveProperty("userId");
            const repository = connection.getRepository(User);
            const users = await repository.find();
            expect((response.body as Record<string, string>).userId).toBe(
                users[0].id,
            );
        });
    });
});
