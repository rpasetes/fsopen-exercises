const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')

const app = express()

// (1326) db connection moved from './models/note.js'
logger.info('connecting to', config.MONGODB_URI)
mongoose.set('strictQuery',false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

// (1326) initial route and request middleware setup
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// (1327) router in './controller/notes.js'
// has starting URL set as parameter, relates
// back to routes handled in notesRouter object
app.use('/api/notes', notesRouter)

// (1330) middleware ordered after routes, as
// usual, with errorHandler defined lastly
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app