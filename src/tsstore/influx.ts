import { DataArray, TSStore, Fetcher, FetchFunction } from '../types'
import { InfluxDB, FieldType } from 'influx'

console.log('InfluxDB', InfluxDB)

interface InfluxConfig {
  host: string
  database: string
}

export class Influx implements TSStore {
  influx: InfluxDB

  constructor(host: String, database: String, measurement: String) {
    const config = {
      host: host,
      database: database,
    }

    this.influx = new InfluxDB(config as InfluxConfig)
  }

  init = (): Promise<Influx> => new Promise((resolve, reject) => this)

  set = (seriesName: String, seriesData: DataArray): Promise<DataArray> =>
    new Promise((resolve, reject) => {
      this.influx.writePoints([
        {
          measurement: 'perf',
          // tags: { host: 'box1.example.com' },
          fields: { seriesName: seriesData },
        },
      ])
    })
}
