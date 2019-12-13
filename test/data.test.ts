import chai from "chai";
import Data from "../src/data/data";

const should = chai.should(); // eslint-disable-line

describe("Data", () => {
    new Data;

    it("should have a City", () => {    
        Data.data.City[0].should.be.an("object");
    });
    
    it("should have a Weather", () => {
        Data.data.Weather[0].should.be.an("object");
    });
});
