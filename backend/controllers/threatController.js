const request = require("supertest");
const app = require("../app");  // This should be the Express app, NOT the server

describe("Threat API Endpoints", () => {
    it("should create a new threat", async () => {
        const res = await request(app)
            .post("/api/threats")
            .send({
                ipAddress: "192.168.1.1",
                domain: "test.com",
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("_id");
    });

    it("should get all threats", async () => {
        const res = await request(app).get("/api/threats");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
