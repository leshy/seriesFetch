import { SeriesFetch } from '../index'
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

class MockFetcher implements Fetcher {
  readonly name = 'mockFetcher'
  readonly refreshTime = 1000

  fetch = (from: Time): Promise<DataArray> =>
    new Promise((resolve, reject) => resolve([[DATE1, 33], [DATE2, 41]]))
}

test('test init', () => {
  const memStore = new Memory()
  return new SeriesFetch({
    kvStore: memStore,
    tsStore: new MockTSStore(),
    fetchers: [],
  })
    .init()
    .then(seriesFetch => seriesFetch.fetch(new MockFetcher()))
    .then(() => memStore.get('mockFetcher'))
    .then(data => expect(data).toEqual(DATE2))
})
