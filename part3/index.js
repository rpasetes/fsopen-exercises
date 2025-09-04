require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

// (1422) okay for ordering middleware, dist first
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path  :', request.path)
  console.log('Body  :', request.body)
  console.log('---')
  next()
}

// (1423) then json parser immediately after, otherwise
// the request logger can't access the body, left undef
app.use(express.json())
app.use(requestLogger)

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

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

// (1428) lmao Finally we get to delete records from our db 
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      // (1429) remember that 204 no content is appropriate code
      // in both cases, where the outcome is a non-existent note
      response.status(204).end()
    })
    .catch(error => next(error))
})

// (1431) great and now we can update records with put requests
// (1441) WHOOP vscode rest success!
// (1442) FRONTEND CRUD SUCCESS!!!
// (1444) interesting to note tho how changing the dummy data 
// ends up crashing the server and any put requests deletes the
// data from the frontend, making it unclear if there's any
// rewrites,, happening to the backend
// (1452) but after checking, i feel like i can handle this
// behavior by passing the error handler middleware at the end,
// (1454) AND IT DOES! wow, such a useful technique! hell yeah.
app.put('/api/notes/:id', (request, response, next) => {
  // (1434) very cool to be using object spread syntax here
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      // (1435) this updates the fields to the db
      note.content = content
      note.important = important

      // (1436) then gets saved and returned back to the frontend
      // WHILE within the code that executes with a valid note id
      // turns out this promise chain can be cleaned up w/ async,
      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// (1424) then unknown endpoint middleware loads only after
// all other endpoints have been defined
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// (1426) and finally, error handling sets up at the very end.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})