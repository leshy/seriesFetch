import { existsSync, unlinkSync } from 'fs'
import { Pickler } from '../pickler'

const TESTFILE = 'testfile.json'

const rmTestfile = () => {
  existsSync(TESTFILE) ? unlinkSync(TESTFILE) : null
}

beforeAll(() => {
  return rmTestfile()
})

afterAll(() => {
  return rmTestfile()
})

test('init', () => {
  const pickler1 = new Pickler(TESTFILE)
  return pickler1.init()
})

test('get set', () => {
  const pickler1 = new Pickler(TESTFILE)
  return pickler1
    .init()
    .then(() => pickler1.set('bla', 3))
    .then(saveReturn => {
      expect(saveReturn).toBe(3)
      return pickler1.get('bla')
    })
    .then(val => expect(val).toBe(3))
    .then(() => new Pickler(TESTFILE).init())
    .then(pickler2 => pickler2.get('bla'))
    .then(val => expect(val).toBe(3))
})
