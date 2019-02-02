import { KVStore } from '../types'
import { existsSync, promises } from 'fs'
const { readFile, writeFile } = promises

export class Pickler implements KVStore {
  fileName: string
  data: { [key: string]: any }

  constructor(fileName: string) {
    this.fileName = fileName
    this.data = {}
  }

  init = (): Promise<Pickler> => {
    return existsSync(this.fileName)
      ? readFile(this.fileName)
        .then(String)
        .then(JSON.parse)
        .then(data => (this.data = data))
        .then(() => this)
      : new Promise((resolve, reject) => resolve(this))
  }
  save = (): Promise<any> => writeFile(this.fileName, JSON.stringify(this.data))

  set = <T>(key: string, value: T): Promise<T> => {
    this.data[key] = value
    return this.save().then(() => value)
  }

  get = (key: string) => this.data[key]
}
