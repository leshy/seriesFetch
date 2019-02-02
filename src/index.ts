import { all } from 'bluebird'
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

export * from './types'
export * from './kvstore/pickler'

const getTime = (dataPoint: DataPoint): Time => dataPoint[0]
const getData = (dataPoint: DataPoint): Data => dataPoint[1]

const call = (method: string) => (obj: any) => obj[method]

class seriesFetch {
  stateStore: KVStore
  tsStore: TSStore
  fetchers: Array<Fetcher>

  constructor(stateStore: KVStore, tsStore: TSStore, fetchers: Array<Fetcher>) {
    this.tsStore = tsStore
    this.stateStore = stateStore
    this.fetchers = fetchers
  }

  startFetchers = () =>
    all(this.fetchers.map(fetcher => this.fetch(fetcher))).then(
      res => res.length,
    )

  fetch = (fetcher: Fetcher): Promise<DataArray> =>
    this.stateStore
      .get(fetcher.name)
      .then((lastTime: Time) => fetcher.fetch(lastTime))
      .then((data: DataArray) =>
        data.length ? this.tsStore.set(fetcher.name, data) : data,
      )
      .then((data: DataArray) =>
        data.length
          ? this.stateStore.set(fetcher.name, getTime(data[-1]))
          : data,
      )
}
