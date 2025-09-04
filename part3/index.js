require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

// (1419) also gonna delete cors from here on since our
// proxy was already set up with our frontend dist build
// const cors = require('cors')
// const corsOptions = {
//  origin: 'http://localhost:5173',
//  optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions))

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path  :', request.path)
  console.log('Body  :', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// (1417) ahh the middleware makes error handling much more
// clean when separate from endpoint functionality, def gon
// help me avoid that wrong endpoint snafu earlier lmao
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    // .then(note => {
    //   if (note) {
    //     response.json(note)
    //   } else {
    //     console.log('a 404 error should show up here')
    //     response.status(404).send({ error: 'id not found' })
    //   }
    // })
    // .catch(error => {
    //   console.log(error)
    //   response.status(400).send({ error: 'malformatted id' })
    //   console.log('we have sent a response status')
    // })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})