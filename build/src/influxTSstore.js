"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const influx_1 = require("influx");
console.log('InfluxDB', influx_1.InfluxDB);
// interface InfluxConfig {
//	host: String
//	database: String
// }
// export class Influx implements TSStore {
//	config: InfluxConfig
//	influx: InfluxDB
//	constructor(host: String, database: String, measurement: String) {
//		this.config = {
//			host: host,
//			database: database,
//		}
//		this.influx = new InfluxDb(this.config)
//	}
//	set = (seriesName: String, seriesData: DataArray): Promise<DataArray> =>
//		new Promise((resolve, reject) => {
//			this.influx.writePoints([
//				{
//					measurement: 'perf',
//					tags: { host: 'box1.example.com' },
//					fields: { cpu: getCpuUsage(), mem: getMemUsage() },
//				}
//			])
//		}
// }
//# sourceMappingURL=influxTSstore.js.map