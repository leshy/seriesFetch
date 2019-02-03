import { TSStore } from '../types';
import { InfluxDB } from 'influx';
interface IConstructorArg {
    host?: String;
    port?: Number;
    database: String;
    measurement: String;
}
export declare class Influx implements TSStore {
    influx: InfluxDB;
    constructor({ host, database, measurement }: IConstructorArg);
    init: () => Promise<Influx>;
    set: (seriesName: String, seriesData: [Date, any][]) => Promise<[Date, any][]>;
}
export {};
