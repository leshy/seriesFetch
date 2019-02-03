import { DATE1, DATE2, MOCKDATA } from './mocks'
import { getTime, getData, getLast, getLastTime } from '../index'

test('getTime', () => expect(getTime(MOCKDATA[0])).toEqual(DATE1))

test('getData', () => expect(getData(MOCKDATA[0])).toEqual(33))

test('getLast', () => expect(getLast(MOCKDATA)).toEqual(MOCKDATA[1]))

test('getLastTime', () => expect(getLastTime(MOCKDATA)).toEqual(DATE2))
