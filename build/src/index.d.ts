import * as p from 'bluebird';
import { Fetcher, KVStore, TSStore } from './types';
export declare const getTime: (dataPoint: [Date, any]) => Date;
export declare const getData: (dataPoint: [Date, any]) => any;
interface IConstructorArg {
    kvStore: KVStore;
    tsStore: TSStore;
    fetchers: Array<Fetcher>;
}
export declare class SeriesFetch {
    kvStore: KVStore;
    tsStore: TSStore;
    fetchers: Array<Fetcher>;
    constructor({ tsStore, kvStore, fetchers }: IConstructorArg);
    init: () => p<this>;
    startFetchers: () => p<any[]>;
    stopFetchers: () => boolean;
    fetch: (fetcher: Fetcher) => Promise<any>;
}
export {};
