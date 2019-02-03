export type Time = Date

export type Data = any
export type DataPoint = [Time, Data]
export type DataArray = Array<DataPoint>

export type FetchFunction = (from: Time) => Promise<DataArray>

export interface Fetcher {
  name: string
  refreshTime: number
  fetch: FetchFunction
}

export interface KVStore {
  init(): Promise<KVStore>
  set<T>(key: string, value: T): Promise<T>
  get(key: string): Promise<any>
}

export interface TSStore {
  init(): Promise<TSStore>
  set(seriesName: string, seriesData: DataArray): Promise<DataArray>
}
