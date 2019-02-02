import { Influx } from '../influx'

test('init', () => {
  const influx = new Influx({
    database: 'testdb',
    measurement: 'testmeasurement',
  })
  return influx.init()
})
