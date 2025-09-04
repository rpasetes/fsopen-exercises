require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

// (1314) okay interesting, setting cors up before the 
// static dist fixed cross origin api route errors!
// nice to know *how* the order matters here
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

// (1334) okay great, we have a 404 error on the browser now!
// (1335) and a malformatted id message sent, with a 400 code
// (1336) great things to note; make sure you're working with
// the Right Endpoint, and there's a difference between: 
// end() - localhost page cannot be found 404
// send() - json message attached to an error page
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        console.log('a 404 error should show up here')
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
      console.log('we have sent a response status')
    })
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

// (1302) set up error handling AND findById, nice
// (1306) inital code 500 changed to 400, due to Invalid id Format
// (1317) okay wait, once an error is hit, the whole server fails
// to run again, so why? because it's an error .Send() not .End()
// (1320) lmao that small s in send is subtle, but can we get a code?
// (1322) oh WOW the params in the route handler didn't line up
// with the function body, but it still worked? that's weird...
// (1331) omFG i've been working on the wrong endpoint...
// it's supposed to be on app.get, not app delete, whoops...
// (1333) well i'mma leave this here cuz we're gonna get here
// in the first exercise of this last set for 3c
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
  console.log('we have sent a response status')
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})