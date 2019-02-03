"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Memory {
    constructor() {
        this.init = () => new Promise((resolve, reject) => resolve(this));
        this.set = (key, value) => {
            this.data[key] = value;
            return new Promise((resolve, reject) => resolve(value));
        };
        this.get = (key) => new Promise((resolve, reject) => resolve(this.data[key]));
        this.data = {};
    }
}
exports.Memory = Memory;
//# sourceMappingURL=memory.js.map