// (sep11; 1244) ah okay here, it's perfectly fine
// to have these contain any type of values, since
// console.log() and error() flexibly matches type
// (1933) aight ONE LAST THING: SPECIFIC TYPES...
// to please the ESLint gods :pray:
type LoggableValue = string | number | boolean | object | null | undefined
const info = (...params: LoggableValue[]) => {
  // (1245) oh whoops, missed a spread operator,
  console.log(...params)
}

const error = (...params: LoggableValue[]) => {
  console.error(...params)
}

export default { info, error }