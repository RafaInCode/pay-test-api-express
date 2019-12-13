import request from "supertest";
import app from "../src/app";

describe("GET /wheather", () => {
    it("should return 200 OK", () => {
        return request(app).get("/cities")
            .expect(200);
    });
});

describe("GET /wheather/period/:start/to/:end", () => {
    it("should return 200 OK", () => {
        return request(app).get("/wheather/2017-03-12/to/2017-03-21")
            .expect(200);
    });
});