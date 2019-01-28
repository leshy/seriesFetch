"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
class FileStore {
    set(key, value) { return value; }
    get(key) { return true; }
}
const getTime = (dataPoint) => dataPoint[0];
const getData = (dataPoint) => dataPoint[1];
const call = (method) => (obj) => obj[method];
class seriesFetch {
    constructor(stateStore, tsStore, fetchers) {
        this.startFetchers = () => bluebird_1.all(this.fetchers.map((fetcher) => this.fetch(fetcher)))
            .then(res => res.length);
        this.fetch = (fetcher) => this.stateStore.get(fetcher.name)
            .then((lastTime) => fetcher.fetch(lastTime))
            .then((data) => this.tsStore.set(fetcher.name, data))
            .then((data) => this.stateStore.set(fetcher.name, getTime(data[-1])));
        this.tsStore = tsStore;
        this.stateStore = stateStore;
        this.fetchers = fetchers;
    }
}
//# sourceMappingURL=index.js.map