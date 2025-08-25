const express = require('express')
const app = express()

// (0938) surfaces 'request.body' for post requests handlers
// (0943) whoops its app.use(), NOT app.run, TYTY CONSOLE
app.use(express.json())

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

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// (1021) abstracting id generation to its own fn,
// opens up the option to update later!
const generateId = () => {
  const maxId = notes.length > 0
    // (1030) ohhh the three dot spread unpacks the array
    // to individual numbers! super fucking cool.
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

// (0941) verbose with variables, for learning purposes
// (1014) ooh got a error on the response, caught typo
// with '.concate()' haha, fixed it and got it working!
// (1040) sweet, posting a bunch of different data shapes,
// behavior working as expected. real good coverage here
app.post('/api/notes', (request, response) => {
  const body = request.body
  
  // (1022) `return`ing error crucial, to end code execution
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // (1023) only carries over crucial props of note in the body;
  // also generates note.important if undef, based on '|| default' 
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  notes = notes.concat(note)
  response.json(note)
  
  // (1015) next version, writing to notes w/ lazy id
  // const maxId = notes.length > 0
  //   ? Math.max(...notes.map(n => Number(n.id)))
  //   : 0
  // const note = request.body
  // note.id = String(maxId + 1)
  // notes = notes.concat(note)
  // response.json(note)
  
  // (0950) initial body fn to check data reception
  // const note = request.body
  // console.log(note)
  // response.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes.filter(note => note.id === id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})