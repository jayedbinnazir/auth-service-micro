import request from "supertest";
import app from "../../src/app";

describe("POST /auth/register", () => {
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
    });
});
