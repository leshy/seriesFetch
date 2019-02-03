"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const p = require("bluebird");
exports.getTime = (dataPoint) => dataPoint[0];
exports.getData = (dataPoint) => dataPoint[1];
class SeriesFetch {
    constructor({ tsStore, kvStore, fetchers }) {
        this.init = () => p
            .props({
            tsStore: this.tsStore.init(),
            kvStore: this.kvStore.init(),
        })
            .then(() => this);
        this.startFetchers = () => p.all(this.fetchers.map(fetcher => this.fetch(fetcher)));
        this.stopFetchers = () => true;
        this.fetch = (fetcher) => this.kvStore
            .get(fetcher.name)
            .then((lastTime) => fetcher.fetch(lastTime))
            .then((data) => this.tsStore.set(fetcher.name, data))
            .then((data) => {
            return this.kvStore.set(fetcher.name, exports.getTime(data[data.length - 1]));
        });
        this.tsStore = tsStore;
        this.kvStore = kvStore;
        this.fetchers = fetchers;
    }
}
exports.SeriesFetch = SeriesFetch;
//# sourceMappingURL=index.js.map