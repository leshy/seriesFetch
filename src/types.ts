export type Time = Date
export interface Data {
  [key: string]: number
}
export type DataPoint = [Time, Data]
export type DataArray = Array<DataPoint>

export type FetchFunction = (from: Time) => Promise<DataArray>

export interface Fetcher {
  name: String
  refreshTime: Number
  fetch: FetchFunction
}

export interface KVStore {
  init(): Promise<KVStore>
  set<T>(key: String, value: T): Promise<T>
  get(key: String): Promise<any>
}

export interface TSStore {
  init(): Promise<TSStore>
  set(seriesName: String, seriesData: DataArray): Promise<DataArray>
}
