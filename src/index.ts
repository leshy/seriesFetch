import * as p from 'bluebird'
import { map, last } from 'lodash'
import {
  DataPoint,
  Time,
  Data,
  Fetcher,
  KVStore,
  TSStore,
  DataArray,
} from './types'

export * from './kvstore/pickler'

const getTime = (dataPoint: DataPoint): Time => dataPoint[0]
const getData = (dataPoint: DataPoint): Data => dataPoint[1]

const call = (method: string) => (obj: any) => obj[method]

interface IConstructorArg {
  kvStore: KVStore
  tsStore: TSStore
  fetchers: Array<Fetcher>
}

export class SeriesFetch {
  kvStore: KVStore
  tsStore: TSStore
  fetchers: Array<Fetcher>

  constructor({ tsStore, kvStore, fetchers }: IConstructorArg) {
    this.tsStore = tsStore
    this.kvStore = kvStore
    this.fetchers = fetchers
  }

  init = () =>
    p
      .props({
        tsStore: this.tsStore.init(),
        kvStore: this.kvStore.init(),
      })
      .then(() => this)

  startFetchers = () => p.all(this.fetchers.map(fetcher => this.fetch(fetcher)))

  fetch = (fetcher: Fetcher): Promise<any> =>
    this.kvStore
      .get(fetcher.name)
      .then((lastTime: Time) => fetcher.fetch(lastTime))
      .then((data: DataArray) => this.tsStore.set(fetcher.name, data))
      .then((data: DataArray) => {
        return this.kvStore.set(fetcher.name, getTime(data[data.length - 1]))
      })
}
