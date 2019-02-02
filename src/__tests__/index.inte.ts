import { SeriesFetch } from '../index'
import { Pickler } from '../kvstore/pickler'
import { Fetcher, Time, DataArray } from '../types'
import { Influx } from '../tsstore/influx'

class TestFetcher implements Fetcher {
  name: 'testFetcher'
  refreshTime: 1000
  fetch = (from: Time): Promise<DataArray> =>
    new Promise((resolve, reject) => resolve([[new Date(), 33]]))
}

test('test init', () =>
  new SeriesFetch({
    kvStore: new Pickler('testfile.json'),
    tsStore: new Influx({ database: 'test', measurement: 'test' }),
    fetchers: [],
  })
    .init()
    .then(seriesFetch => seriesFetch.fetch(new TestFetcher())))
