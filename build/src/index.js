"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const bluebird_1 = require("bluebird");
class Pickler {
    constructor(fileName) {
        this.save = () => fs_1.writeFileSync(this.fileName, JSON.stringify(this.data));
        this.set = (key, value) => {
            this.data[key] = value;
            this.save();
            return value;
        };
        this.get = (key) => this.data[key];
        this.fileName = fileName;
        this.data = JSON.parse(String(fs_1.readFileSync(fileName)));
    }
}
exports.Pickler = Pickler;
const getTime = (dataPoint) => dataPoint[0];
const getData = (dataPoint) => dataPoint[1];
const call = (method) => (obj) => obj[method];
class seriesFetch {
    constructor(stateStore, tsStore, fetchers) {
        this.startFetchers = () => bluebird_1.all(this.fetchers.map((fetcher) => this.fetch(fetcher)))
            .then(res => res.length);
        this.fetch = (fetcher) => this.stateStore.get(fetcher.name)
            .then((lastTime) => fetcher.fetch(lastTime))
            .then((data) => data.length ? this.tsStore.set(fetcher.name, data) : data)
            .then((data) => data.length ? this.stateStore.set(fetcher.name, getTime(data[-1])) : data);
        this.tsStore = tsStore;
        this.stateStore = stateStore;
        this.fetchers = fetchers;
    }
}
//# sourceMappingURL=index.js.map