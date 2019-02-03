import { DATE1, DATE2, MOCKDATA, MockTSStore, MockFetcher } from './mocks'
import { SeriesFetch, getTime, getData } from '../index'
import { Memory } from '../kvstore/memory'
import { Influx } from '../tsstore/influx'

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
