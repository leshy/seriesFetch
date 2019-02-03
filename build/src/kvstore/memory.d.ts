import { KVStore } from '../types';
export declare class Memory implements KVStore {
    data: {
        [key: string]: any;
    };
    constructor();
    init: () => Promise<Memory>;
    set: <T>(key: string, value: T) => Promise<T>;
    get: (key: string) => Promise<any>;
}
