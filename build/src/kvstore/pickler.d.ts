import { KVStore } from '../types';
export declare class Pickler implements KVStore {
    fileName: string;
    data: {
        [key: string]: any;
    };
    constructor(fileName: string);
    init: () => Promise<Pickler>;
    save: () => Promise<any>;
    set: <T>(key: string, value: T) => Promise<T>;
    get: (key: string) => any;
}
