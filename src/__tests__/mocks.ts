import { Fetcher, Time, DataArray, TSStore } from '../types'
export const DATE1 = new Date(1549200686276)
export const DATE2 = new Date(1549200688049)
export const MOCKDATA: DataArray = [[DATE1, 33], [DATE2, 41]]

export class MockTSStore implements TSStore {
  init = (): Promise<MockTSStore> =>
    new Promise((resolve, reject) => resolve(this))

  set = (name: String, data: DataArray): Promise<DataArray> =>
    new Promise((resolve, reject) => resolve(data))
}

export class MockFetcher implements Fetcher {
  readonly name = 'mockFetcher'
  readonly refreshTime = 1000

  fetch = (from: Time): Promise<DataArray> =>
    new Promise((resolve, reject) => resolve(MOCKDATA))
}
