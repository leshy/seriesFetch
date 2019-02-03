"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const p = require("bluebird");
const dateFns = require("date-fns");
const lodash_1 = require("lodash");
exports.getTime = (dataPoint) => dataPoint[0];
exports.getData = (dataPoint) => dataPoint[1];
exports.getLast = (data) => data[data.length - 1];
exports.getLastTime = (data) => exports.getTime(exports.getLast(data));
class SeriesFetch {
    constructor({ tsStore, kvStore, fetchers }) {
        this.init = () => p
            .props({
            tsStore: this.tsStore.init(),
            kvStore: this.kvStore.init(),
        })
            .then(() => (this.timers = {}));
        this.startFetchers = () => p.all(this.fetchers.map(fetcher => this.fetchLoop(fetcher)));
        this.stopFetchers = () => {
            lodash_1.mapValues(this.timers, timer => {
                if (timer instanceof Boolean) {
                    return;
                }
                clearTimeout(timer);
            });
        };
        this.getFetchTime = (fetcher, lastTime) => lastTime
            ? new Promise((resolve, reject) => resolve(lastTime))
            : this.kvStore
                .get(fetcher.name)
                .then((lastTime) => lastTime ? lastTime : dateFns.subYears(new Date(), 1));
        this.fetch = (fetcher, lastTime) => this.getFetchTime(fetcher, lastTime)
            .then(lastTime => fetcher.fetch(lastTime))
            .then((data) => this.tsStore.set(fetcher.name, data))
            .then((data) => this.kvStore.set(fetcher.name, exports.getLastTime(data)));
        this.fetchLoop = (fetcher, lastTime) => {
            if (this.timers[fetcher.name] != null) {
            }
            return this.fetch(fetcher, lastTime).then(lastTime => this.maybeSchedule(fetcher, lastTime));
        };
        this.maybeSchedule = (fetcher, lastTime) => {
            if (this.timers[fetcher.name] === false) {
                return;
            }
            this.timers[fetcher.name] = setTimeout(() => this.fetchLoop(fetcher, lastTime), fetcher.refreshTime);
        };
        this.tsStore = tsStore;
        this.kvStore = kvStore;
        this.fetchers = fetchers;
        this.timers = {};
    }
}
exports.SeriesFetch = SeriesFetch;
//# sourceMappingURL=index.js.map