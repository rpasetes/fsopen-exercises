const express = require('express')
const app = express()

// (1228) okay first things first, json request middleware
app.use(express.json())

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

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  contacts = contacts.filter(c => c.id !== id)

  response.status(204).end()
  // console.log(contacts)
})

// (..1228) templating from "Getting random integer between
// two values" in random() Mozilla docs
// (1250) oop okay, the id is also a String in the data, 
const generateId = () => {
  const ceil = 1048576
  const floor = 4
  return String(Math.floor(Math.random() * (ceil - floor) + floor))
} 

// (1232) aight we don't need to do error handling yet,
// (1239) okay lmao having the data named 'contacts' kinda confuse
// (1244) whoop twitter break + emotional attuning break; back to it.
// (1246) wait haha, make a contact w/ the appropriate props; not notes
// (1249) OMFG Remember: forward slash before any route, esp /api/...
// (1252) phew AMAZING contacts updating with new numbers!
// (1254) cool, shaping the data to match the other resources; ship!
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  const contact = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  console.log('creating new contact', contact)

  contacts = contacts.concat(contact)
  response.json(contact)
  console.log('contacts updating to:', contacts)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})