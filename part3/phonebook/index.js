// (..1044) `echo 'console.log('hello world')' > index.js`
// (..1046) pasting contacts data,
// logging to console, success!
// (1049) npm install express
// (1052) import first, then initialize app
// (1054) set port and let the app listen
// (1058) save, server running at 3001, success!
// (1105) for funsies, define root directory get, success! (at 1107)
// (1108) ooh now making api route, huh there's something with
// json that i need to import with express, yea? (nah just for body)
// (1110) meta: try shit out and respond if things break
// (1111) uy pucha it works in the browser! api/persons success!
const express = require('express') // (1057) import String not const
const app = express()

// app.use(express.json())

contacts = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
console.log(contacts)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})