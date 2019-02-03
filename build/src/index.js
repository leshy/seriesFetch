"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const p = require("bluebird");
__export(require("./kvstore/pickler"));
const getTime = (dataPoint) => dataPoint[0];
const getData = (dataPoint) => dataPoint[1];
const call = (method) => (obj) => obj[method];
class SeriesFetch {
    constructor({ tsStore, kvStore, fetchers }) {
        this.init = () => p
            .props({
            tsStore: this.tsStore.init(),
            kvStore: this.kvStore.init(),
        })
            .then(() => this);
        this.startFetchers = () => p.all(this.fetchers.map(fetcher => this.fetch(fetcher)));
        this.fetch = (fetcher) => this.kvStore
            .get(fetcher.name)
            .then((lastTime) => fetcher.fetch(lastTime))
            .then((data) => this.tsStore.set(fetcher.name, data))
            .then((data) => {
            return this.kvStore.set(fetcher.name, getTime(data[data.length - 1]));
        });
        this.tsStore = tsStore;
        this.kvStore = kvStore;
        this.fetchers = fetchers;
    }
}
exports.SeriesFetch = SeriesFetch;
//# sourceMappingURL=index.js.map