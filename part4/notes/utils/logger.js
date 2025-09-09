// (1255) separate file made for external logging services
const info = (...params) => {
  console.log(params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }