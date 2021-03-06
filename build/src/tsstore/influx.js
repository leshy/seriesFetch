"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const influx_1 = require("influx");
class Influx {
    constructor({ host = 'localhost', database, measurement }) {
        this.init = () => new Promise((resolve, reject) => resolve(this));
        this.set = (seriesName, seriesData) => new Promise((resolve, reject) => {
            this.influx.writePoints([
                {
                    measurement: 'perf',
                    // tags: { host: 'box1.example.com' },
                    fields: { seriesName: seriesData },
                },
            ]);
        });
        const config = {
            host: host,
            database: database,
        };
        this.influx = new influx_1.InfluxDB(config);
    }
}
exports.Influx = Influx;
//# sourceMappingURL=influx.js.map