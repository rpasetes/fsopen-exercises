const express = require('express')
const app = express()

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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// (1321) tyty colon syntax for routing, maps to req.params
// (1324) can also confirm auto change tracking works upon save!
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  // (1326) hehe guard pattern bb, for undef notes
  // (1328) ohh nvm guard pattern doesn't work cuz of: 
  // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers 
  // after they are sent to the client, have to if-else
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})