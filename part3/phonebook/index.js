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

// (1124) remember: get id from request.params!
// (1127) whoops. missing forward slash before api, sneaky...
// (1128) wow, resource get success! great typo catch, 
// (1130) huh missing .end() after error status responds with 304...
// (1134) ohh, if there's nothing to catch w/ the filter, the array
// is still going to exist! that's why we find() the resoure instead
// (1138) okay cool, functionality working as intended. differing w/
// fsopen material by returning the 404 status instead of if-elsing...
// (1144) aight cleaning up here, but should be ready to checkpoint!
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const contact = contacts.find(c => c.id === id)
  console.log('finding contact', contact)

  if (!contact) { return response.status(404).end() }
  response.json(contact)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})