import { SeriesFetch, getTime, getData } from '../index'
import { Memory } from '../kvstore/memory'
import { Fetcher, Time, DataArray, TSStore } from '../types'
import { Influx } from '../tsstore/influx'

class MockTSStore implements TSStore {
  init = (): Promise<MockTSStore> =>
    new Promise((resolve, reject) => resolve(this))

  set = (name: String, data: DataArray): Promise<DataArray> =>
    new Promise((resolve, reject) => resolve(data))
}

const DATE1 = new Date(1549200686276)
const DATE2 = new Date(1549200688049)
const MOCKDATA: DataArray = [[DATE1, 33], [DATE2, 41]]

class MockFetcher implements Fetcher {
  readonly name = 'mockFetcher'
  readonly refreshTime = 1000

  fetch = (from: Time): Promise<DataArray> =>
    new Promise((resolve, reject) => resolve(MOCKDATA))
}

describe('general', () => {
  test('getTime', () => expect(getTime(MOCKDATA[0])).toEqual(DATE1))

  test('getData', () => expect(getData(MOCKDATA[0])).toEqual(33))
})

describe('seriesFetch', () => {
  let seriesFetch: SeriesFetch
  const memStore = new Memory()

  test('instantiate', () => {
    seriesFetch = new SeriesFetch({
      kvStore: memStore,
      tsStore: new MockTSStore(),
      fetchers: [],
    })
  })

  test('initialize', () => seriesFetch.init())

  test('fetch', () =>
    seriesFetch
      .fetch(new MockFetcher())
      .then(() => memStore.get('mockFetcher'))
      .then(data => expect(data).toEqual(DATE2)))

  test('startFetchers', () =>
    seriesFetch
      .startFetchers()
      .then(() => memStore.get('mockFetcher'))
      .then(data => expect(data).toEqual(DATE2))
      .then(() => seriesFetch.stopFetchers()))
})
