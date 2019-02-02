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

class seriesFetch {
  kvStore: KVStore
  tsStore: TSStore
  fetchers: Array<Fetcher>

  constructor(kvStore: KVStore, tsStore: TSStore, fetchers: Array<Fetcher>) {
    this.tsStore = tsStore
    this.kvStore = kvStore
    this.fetchers = fetchers
  }

  initialize = () =>
    p.props({
      tsStore: this.tsStore.init(),
      kvStore: this.kvStore.init(),
    })

  startFetchers = () => p.all(this.fetchers.map(fetcher => this.fetch(fetcher)))

  fetch = (fetcher: Fetcher): Promise<any> =>
    this.kvStore
      .get(fetcher.name)
      .then((lastTime: Time) => fetcher.fetch(lastTime))
      .then((data: DataArray) => this.tsStore.set(fetcher.name, data))
      .then((data: DataArray) =>
        this.kvStore.set(fetcher.name, getTime(data[-1])),
      )
}
