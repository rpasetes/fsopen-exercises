// (sep11;1312) sweet added types from express
import { Request, Response, ErrorRequestHandler, RequestHandler } from 'express'
// and changed from require to ES6
import logger from './logger'

// (1825) oh my gosh, i can also do the same type inferences
// with RequestHandler, no 'request: Request' manual tedium!
const requestLogger: RequestHandler = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path  :', request.path)
  logger.info('Body  :', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// (1313) also looks like the Error type is just available in ts,
// (1820) yo! @types/express has a dedicated type for this fn, so
// i don't need to manually type my parameters with this context!
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// (1314) and finally changed the default export
export default {
  requestLogger,
  unknownEndpoint,
  errorHandler
}