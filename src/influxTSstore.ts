import { DataArray, TSStore, Fetcher, FetchFunction } from './index'
import { InfluxDB, FieldType } from 'influx'

console.log('InfluxDB', InfluxDB)

interface InfluxConfig {
	host: String
	database: String
}

export class Influx implements TSStore {
	influx: InfluxDB

	constructor(host: String, database: String, measurement: String) {
		const config = {
			host: host,
			database: database,
		}

		this.influx = new InfluxDb(config)
	}

	set = (seriesName: String, seriesData: DataArray): Promise<DataArray> =>
		new Promise((resolve, reject) => {
			this.influx.writePoints([
				{
					measurement: 'perf',
					// tags: { host: 'box1.example.com' },
					fields: { seriesName: seriesData }
				}
			])
		})
}
