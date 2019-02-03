import { DATE1, DATE2, MOCKDATA, MockTSStore, MockFetcher } from './mocks'
import { SeriesFetch, getTime, getData } from '../index'
import { Memory } from '../kvstore/memory'
import { Influx } from '../tsstore/influx'

describe('seriesFetch', () => {
  let seriesFetch: SeriesFetch
  const memStore = new Memory()
  const fetcher = new MockFetcher()

  test('instantiate', () => {
    seriesFetch = new SeriesFetch({
      kvStore: memStore,
      tsStore: new MockTSStore(),
      fetchers: [],
    })
  })

  test('initialize', () => seriesFetch.init())

  test('getFetchTime', () =>
    seriesFetch
      .getFetchTime(fetcher)
      .then(time => expect(time.constructor).toEqual(Date)))

  test('getFetchTime2', () =>
    seriesFetch
      .getFetchTime(fetcher, DATE1)
      .then(time => expect(time).toEqual(DATE1)))

  test('fetch', () =>
    seriesFetch
      .fetch(fetcher)
      .then(() => memStore.get('mockFetcher'))
      .then(data => expect(data).toEqual(DATE2)))

  test('ensure storage', () =>
    expect(memStore.data).toEqual({ mockFetcher: DATE2 }))

  test('fetchLoop', () =>
    seriesFetch
      .fetchLoop(fetcher)
      .then(() => memStore.get('mockFetcher'))
      .then(data => expect(data).toEqual(DATE2)))

  test('stopFetchers1', () => seriesFetch.stopFetchers())

  test('startFetchers', () =>
    seriesFetch
      .startFetchers()
      .then(() => memStore.get('mockFetcher'))
      .then(data => expect(data).toEqual(DATE2)))

  test('stopFetchers2', () => seriesFetch.stopFetchers())
})
