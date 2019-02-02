import { DataArray, TSStore, Fetcher, FetchFunction } from '../types'
import { InfluxDB, FieldType } from 'influx'

interface InfluxConfig {
  host: string
  database: string
}

interface IConstructorArg {
  host?: String
  port?: Number
  database: String
  measurement: String
}

export class Influx implements TSStore {
  influx: InfluxDB

  constructor({ host = 'localhost', database, measurement }: IConstructorArg) {
    const config = {
      host: host,
      database: database,
    }

    this.influx = new InfluxDB(config as InfluxConfig)
  }

  init = (): Promise<Influx> => new Promise((resolve, reject) => resolve(this))

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
