const request = require("supertest");
const app = require("../server"); // Ensure this points to your Express app

describe("Threat API Endpoints", () => {
    it("should create a new threat", async () => {
        const res = await request(app)
            .post("/api/threats")
            .send({
                ipAddress: "192.168.1.1",
                domain: "test.com",
                url: "http://test.com",
                fileHash: "abcd1234",
                threatLevel: "Medium",
                category: "IP",
                isMalicious: false
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
