import chai from "chai";
import Data from "../src/data/data";

const expect = chai.expect; // eslint-disable-line

describe("Data", () => {
    new Data;

    it("should have a City", () => {    
        expect(Data.data.City).to.not.be.empty;
    });
    
    it("should have a Weather", () => {
        expect(Data.data.Weather).to.not.be.empty;
    });
});
