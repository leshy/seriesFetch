import { KVStore } from '../types'

export class Memory implements KVStore {
  data: { [key: string]: any }

  constructor() {
    this.data = {}
  }

  init = (): Promise<Memory> => new Promise((resolve, reject) => resolve(this))

  set = <T>(key: string, value: T): Promise<T> => {
    this.data[key] = value
    return new Promise((resolve, reject) => resolve(value))
  }

  get = (key: string): Promise<any> =>
    new Promise((resolve, reject) => resolve(this.data[key]))
}
