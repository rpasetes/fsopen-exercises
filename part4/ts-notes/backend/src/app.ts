import express from 'express'
import mongoose, { Error } from 'mongoose'
import config from './utils/config'
import logger from './utils/logger'
import middleware from './utils/middleware'
import notesRouter from './controllers/notes'

// (sep10;0916) ts does implicit type inference,
// no need to define when creating object!
const app = express()

logger.info('connecting to', config.MONGODB_URI)
mongoose.set('strictQuery',false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error: Error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist-frontend'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app