import { TSStore } from './index';
import { InfluxDB } from 'influx';
export declare class Influx implements TSStore {
    influx: InfluxDB;
    constructor(host: String, database: String, measurement: String);
    set: (seriesName: String, seriesData: [Date, import(".").Data][]) => Promise<[Date, import(".").Data][]>;
}
