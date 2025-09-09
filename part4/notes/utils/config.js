// (1356) oh yea and env vars being set here feels
// nice, for linting and structural purposes
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT }