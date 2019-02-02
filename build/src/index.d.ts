export declare type Time = Date;
export interface Data {
    [key: string]: number;
}
export declare type DataPoint = [Time, Data];
export declare type DataArray = Array<DataPoint>;
export declare type FetchFunction = (from: Time) => Promise<DataArray>;
export interface Fetcher {
    name: String;
    refreshTime: Number;
    fetch: FetchFunction;
}
export interface KVStore {
    set<T>(key: String, value: T): Promise<T> | T;
    get(key: String): Promise<any> | any;
}
export interface TSStore {
    set(seriesName: String, seriesData: DataArray): Promise<DataArray>;
}
export declare class Pickler implements KVStore {
    fileName: string;
    data: {
        [key: string]: any;
    };
    constructor(fileName: string);
    save: () => void;
    set: <T>(key: string, value: T) => T;
    get: (key: string) => any;
}
