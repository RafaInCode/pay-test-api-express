import request from "supertest";
import app from "../src/app";

describe("GET /cities", () => {
    it("should return 200 OK", () => {
        return request(app).get("/cities")
            .expect(200);
    });
});

describe("GET /city/:cityId", () => {
    it("should return 200 OK", () => {
        return request(app).get("/city/3992619")
            .expect(200);
    });
});

describe("GET /city/coordinates/:lat/:lon", () => {
    it("should return 200 OK", () => {
        return request(app).get("/city/coordinates/28.700001/-100.51667")
            .expect(200);
    });
});