import { TSStore } from '../types';
import { InfluxDB } from 'influx';
export declare class Influx implements TSStore {
    influx: InfluxDB;
    constructor(host: String, database: String, measurement: String);
    init: () => Promise<Influx>;
    set: (seriesName: String, seriesData: [Date, import("../types").Data][]) => Promise<[Date, import("../types").Data][]>;
}
