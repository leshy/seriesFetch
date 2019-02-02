"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const index_1 = require("../index");
const TESTFILE = 'testfile.json';
const rmTestfile = () => {
    fs_1.existsSync(TESTFILE) ? fs_1.unlinkSync(TESTFILE) : null;
};
beforeAll(() => {
    rmTestfile();
});
afterAll(() => {
    rmTestfile();
});
test('init', () => {
    const pickler1 = new index_1.Pickler('testfile.json');
});
test('get set', () => {
    const pickler1 = new index_1.Pickler('testfile.json');
    pickler1.set('bla', 3);
    expect(pickler1.get('bla')).toBe(3);
    const pickler2 = new index_1.Pickler('testfile.json');
    expect(pickler2.get('bla')).toBe(3);
});
//# sourceMappingURL=seriesFetch.unit.js.map