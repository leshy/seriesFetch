import * as p from 'bluebird';
import { Fetcher, KVStore, TSStore } from './types';
export declare const getTime: (dataPoint: [Date, any]) => Date;
export declare const getData: (dataPoint: [Date, any]) => any;
export declare const getLast: (data: [Date, any][]) => [Date, any];
export declare const getLastTime: (data: [Date, any][]) => Date;
interface IConstructorArg {
    kvStore: KVStore;
    tsStore: TSStore;
    fetchers: Array<Fetcher>;
}
export declare class SeriesFetch {
    kvStore: KVStore;
    tsStore: TSStore;
    fetchers: Array<Fetcher>;
    timers: {
        [s: string]: NodeJS.Timer | Boolean;
    };
    constructor({ tsStore, kvStore, fetchers }: IConstructorArg);
    init: () => p<{}>;
    startFetchers: () => p<void[]>;
    stopFetchers: () => void;
    getFetchTime: (fetcher: Fetcher, lastTime?: Date | undefined) => Promise<Date>;
    fetch: (fetcher: Fetcher, lastTime?: Date | undefined) => Promise<any>;
    fetchLoop: (fetcher: Fetcher, lastTime?: Date | undefined) => Promise<void>;
    maybeSchedule: (fetcher: Fetcher, lastTime?: Date | undefined) => void;
}
export {};
