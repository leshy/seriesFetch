import { all } from 'bluebird'
import { map, last } from 'lodash'

export type Time = Date
export interface Data { [ key: string ]: number }
export type DataPoint = [ Time, Data ]
export type DataArray = Array<DataPoint>

export type FetchFunction = (from: Time) => Promise<DataArray>
export interface Fetcher {
	name: String
	refreshTime: Number
	fetch: FetchFunction
}

export interface KVStore {
	set<T>(key: String, value: T): Promise<T> | T
	get(key: String): Promise<any> | any
}

export interface TSStore {
	set(seriesName: String, seriesData: DataArray): Promise<DataArray>
}

class FileStore implements KVStore {
	set<T>(key: String, value: T) { return value }
	get(key: String) { return true }
}

const getTime = (dataPoint: DataPoint): Time => dataPoint[0]
const getData = (dataPoint: DataPoint): Data => dataPoint[1]

const call = (method: string) => (obj: any) => obj[ method ]

class seriesFetch {
	stateStore: KVStore
	tsStore: TSStore
	fetchers: Array<Fetcher>

	constructor(stateStore: KVStore, tsStore: TSStore, fetchers: Array<Fetcher> ) {
		this.tsStore = tsStore;
		this.stateStore = stateStore;
		this.fetchers = fetchers
	}

	startFetchers = () =>
		all(this.fetchers.map((fetcher) => this.fetch(fetcher)))
		.then(res => res.length)

	fetch = (fetcher: Fetcher): Promise<DataArray> =>
		this.stateStore.get(fetcher.name)
		.then((lastTime: Time) => fetcher.fetch(lastTime))
		.then((data: DataArray) => this.tsStore.set(fetcher.name, data))
		.then((data: DataArray) => this.stateStore.set(fetcher.name, getTime(data[-1])))
}
