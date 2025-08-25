const express = require('express')
const app = express()

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

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${new Date(Date.now())}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const contact = contacts.find(c => c.id === id)

  if (!contact) { return response.status(404).end() }
  response.json(contact)
})

// (1212) aight we back, n'yea lul u can just overwrite contacts
// (1214) and end the response status with 204, lul again
// (1215) meta: retain both material and exercises within 24 hrs
// (1218) whoops, filtered all contacts BUT id param haha (used ===)
// (1219) nice, rest client deletes the number! thx console.log()
// (1222) and it can take multiple delete requests heck yea! ship
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  contacts = contacts.filter(c => c.id !== id)

  response.status(204).end()
  console.log(contacts)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})