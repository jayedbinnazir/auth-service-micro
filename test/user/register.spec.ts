import request from "supertest";
import app from "../../src/app";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";
// import { truncateTable } from "../user/utils/index";
import { User } from "../../src/entity/User";
import { Roles } from "../../src/const";

describe("POST /auth/register", () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        await connection.dropDatabase();
        await connection.synchronize();

        //truncated database
        // await truncateTable(connection);
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
                password: "thedenoo",
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
                password: "thedenoo",
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
                password: "thedenoo",
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
            // expect(users[0].password).toBe(userData.password);
        });

        it("should return userId", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "thedenoo",
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

        it("should assign a customer role", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "thedenoo",
            };
            //act
            await request(app).post("/auth/register").send(userData);

            //assert
            const repository = connection.getRepository(User);
            const users = await repository.find();

            expect(users[0]).toHaveProperty("role");
            expect(users[0].role).toBe(Roles.CUSTOMER);
        });

        it("should save hashed password in the database", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "thedenoo",
            };
            //act
            await request(app).post("/auth/register").send(userData);

            //Assert
            const repository = connection.getRepository(User);
            const users = await repository.find();

            expect(users[0].password).not.toBe(userData.password);
            expect(users[0].password).toHaveLength(60);
            expect(users[0].password).toMatch(/^\$2b\$\d+\$/);
        });

        it("the email should be unique", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "thedenoo",
            };

            const userRepository = connection.getRepository(User);
            await userRepository.save({ ...userData, role: Roles.CUSTOMER });
            //act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            const users = await userRepository.find();
            //assert
            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(1);
        });
    });

    describe("Fields are missing", () => {
        it("Should return status 400 if email field is missing", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "",
                password: "thedenoo",
            };
            //act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            console.log(response.body);
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            //assert
            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(0);
        });
        it("Should return status 400 if First Name field is missing", async () => {
            //Arrange
            const userData = {
                firstName: "",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "thedenoo",
            };
            //act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            console.log(response.body);
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            //assert
            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(0);
        });
        it("Should return status 400 if last name field is missing", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "",
                email: "jayed.freelance@gmail.com",
                password: "thedenoo",
            };
            //act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            console.log(response.body);
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            //assert
            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(0);
        });
        it("Should return status 400 if password field is missing", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: "jayed.freelance@gmail.com",
                password: "",
            };
            //act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            console.log(response.body);
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            //assert
            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(0);
        });
    });

    describe("Field are in proper format", () => {
        it("should trim email field", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: " jayed.freelance@gmail.com ",
                password: "thedenoo",
            };
            //act
            await request(app).post("/auth/register").send(userData);

            const userRepository = connection.getRepository(User);

            await userRepository.save({ ...userData, role: Roles.CUSTOMER });

            const users = await userRepository.find();
            //assert
            expect(users[0].email).toBe("jayed.freelance@gmail.com");
        });
        it("should be valid email format", async () => {
            //Arrange
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: " jayed.freelancegmail.com ",
                password: "thedenoo",
            };
            //act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            const userRepository = connection.getRepository(User);

            const users = await userRepository.find();
            //assert
            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(0);
        });

        it("should return 400 status code if password length is less than 8 characters", async () => {
            const userData = {
                firstName: "jayed",
                lastName: "bin nazir",
                email: " jayed.freelance@gmail.com ",
                password: "thedeno",
            };
            //act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            //assert

            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(0);
        });

        it("shoud return an array of error messages if email is missing", async () => {
            // Arrange
            const userData = {
                firstName: "Rakesh",
                lastName: "K",
                email: "",
                password: "password",
            };
            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // Assert
            expect(response.body).toHaveProperty("errors");
            expect(
                (response.body as Record<string, string>).errors.length,
            ).toBeGreaterThan(0);
        });
    });
});
