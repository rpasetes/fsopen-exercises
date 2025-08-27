const express = require('express')
const app = express()

// (1046) static content middleware hosts 'dist' frontend build
// (1048) kinda wild that u can do this tbh
// (1056) OMFG Remember!! close all other servers b4 u update
app.use(express.static('dist'))

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

console.log(notes)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path  :', request.path)
  console.log('Body  :', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)

// (1051) okay wait since we have the static content middleware,
// we don't need this endpoint handled anymore
// app.get('/', (request, response) => {
//   response.send('<h1>Hello Notes!</h1>')
// })

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  notes = notes.concat(note)
  response.json(note)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})