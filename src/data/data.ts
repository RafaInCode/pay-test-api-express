// import * as jsonfile from "jsonfile";

import path from "path";
import fs, { readFileSync } from "fs";
//import logger from "../util/logger";
//import jsonfile from "jsonfile";



class Data {

    public static data: { [k: string]: any } = {};
    public static entities: Array<string> = [];
    private dataDirectory: string = path.join(__dirname, "../../src/data/entities");

    constructor() {
        const rawNames = fs.readdirSync(this.dataDirectory);

        rawNames.forEach(element => {
            const name = path.basename(element, ".json");
            Data.entities.push(name);
            Data.data[name] = JSON.parse(readFileSync(path.join(this.dataDirectory, element), {encoding: "utf8"}));
        });
    }
}

export default Data;