"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const { readFile, writeFile } = fs_1.promises;
class Pickler {
    constructor(fileName) {
        this.init = () => {
            return fs_1.existsSync(this.fileName)
                ? readFile(this.fileName)
                    .then(String)
                    .then(JSON.parse)
                    .then(data => (this.data = data))
                    .then(() => this)
                : new Promise((resolve, reject) => resolve(this));
        };
        this.save = () => writeFile(this.fileName, JSON.stringify(this.data));
        this.set = (key, value) => {
            this.data[key] = value;
            return this.save().then(() => value);
        };
        this.get = (key) => this.data[key];
        this.fileName = fileName;
        this.data = {};
    }
}
exports.Pickler = Pickler;
//# sourceMappingURL=pickler.js.map