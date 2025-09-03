// (1258) dotenv imported before Note to retrieve MONGODB_URI
// best practice to surface env vars before other imports
require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

app.use(express.static('dist'))

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// console.log(notes)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path  :', request.path)
  console.log('Body  :', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)

// (1304) YOOOO LFG THE FRONTEND CONNECTS TO OUR DB
// JUST NOTICED LMAOOO by commenting out the array in memory
// (1308) also testing this endpoint locally in vscode
// we are getting the appropriate response from our db!
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  Note.findById(id).then(note => {
    response.json(note)
  })
})

// (1307) don't need this anymore since our db handles ids
// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => Number(n.id)))
//     : 0
//   return String(maxId + 1)
// }

// (1308) just updated requests/post_new_note.rest
// looks like the endopint writes to the database!
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

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes.filter(note => note.id === id)

  res.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})