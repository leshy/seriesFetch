import * as p from 'bluebird'
import * as dateFns from 'date-fns'
import { map, last, mapValues } from 'lodash'
import {
  DataPoint,
  Time,
  Data,
  Fetcher,
  KVStore,
  TSStore,
  DataArray,
} from './types'

export const getTime = (dataPoint: DataPoint): Time => dataPoint[0]
export const getData = (dataPoint: DataPoint): Data => dataPoint[1]
export const getLast = (data: DataArray): DataPoint => data[data.length - 1]
export const getLastTime = (data: DataArray): Time => getTime(getLast(data))

interface IConstructorArg {
  kvStore: KVStore
  tsStore: TSStore
  fetchers: Array<Fetcher>
}

export class SeriesFetch {
  kvStore: KVStore
  tsStore: TSStore
  fetchers: Array<Fetcher>
  timers: { [s: string]: NodeJS.Timer }

  constructor({ tsStore, kvStore, fetchers }: IConstructorArg) {
    this.tsStore = tsStore
    this.kvStore = kvStore
    this.fetchers = fetchers
    this.timers = {}
  }

  init = () =>
    p
      .props({
        tsStore: this.tsStore.init(),
        kvStore: this.kvStore.init(),
      })
      .then(() => (this.timers = {}))

  startFetchers = () => p.all(this.fetchers.map(fetcher => this.fetch(fetcher)))

  stopFetchers = () => mapValues(this.timers, timer => clearTimeout(timer))

  maybeGetFetchTime = (fetcher: Fetcher, lastTime?: Time): Promise<Time> =>
    lastTime
      ? new Promise((resolve, reject) => resolve(lastTime))
      : this.kvStore
        .get(fetcher.name)
        .then((lastTime: Time) =>
          lastTime ? lastTime : dateFns.subYears(new Date(), 1),
        )

  fetch = (fetcher: Fetcher, lastTime?: Time): Promise<any> =>
    this.maybeGetFetchTime(fetcher, lastTime)
      .then(lastTime => fetcher.fetch(lastTime))
      .then((data: DataArray) => this.tsStore.set(fetcher.name, data))
      .then((data: DataArray) =>
        this.kvStore.set(fetcher.name, getLastTime(data)),
      )
      .then(
        lastTime =>
          (this.timers[fetcher.name] = setTimeout(
            () => this.fetch(fetcher, lastTime),
            fetcher.refreshTime,
          )),
      )
}
