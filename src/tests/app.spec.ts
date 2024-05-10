import app from "../app";
import { calculateDiscount } from "../utils";
import request from "supertest";

describe.skip("App", () => {
    it("should calculate discount", () => {
        const result = calculateDiscount(100, 10);
        expect(result).toBe(10);
    });

    it("should return status code 200", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});
