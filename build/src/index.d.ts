import * as p from 'bluebird';
import { Fetcher, KVStore, TSStore } from './types';
export * from './kvstore/pickler';
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
    init: () => p<{
        tsStore: TSStore;
        kvStore: KVStore;
    }>;
    startFetchers: () => p<any[]>;
    fetch: (fetcher: Fetcher) => Promise<any>;
}
