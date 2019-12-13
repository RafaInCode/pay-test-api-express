import chai from "chai";
import Data from "../src/data/data";

const expect = chai.expect; // eslint-disable-line
new Data;

describe("Data", () => {
    it("expect have a City", () => {    
        expect(Data.data.City).to.not.be.empty;
    });
    
    it("expect have a Weather", () => {
        expect(Data.data.Weather).to.not.be.empty;
    });
});
