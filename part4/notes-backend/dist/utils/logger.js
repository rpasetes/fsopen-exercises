"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// (sep11; 1244) ah okay here, it's perfectly fine
// to have these contain any type of values, since
// console.log() and error() flexibly matches type
const info = (...params) => {
    // (1245) oh whoops, missed a spread operator,
    console.log(...params);
};
const error = (...params) => {
    console.error(...params);
};
exports.default = { info, error };
