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
})

const generateId = () => {
  const ceil = 1048576
  const floor = 4
  return String(Math.floor(Math.random() * (ceil - floor) + floor))
} 

// (1310) okay yea for both cases, we're responding a 400 bad request
// (1311) AND returning appropriate json to explain error reasoning
// (1316) INTERESTING, hanging commas in json requests is a syntax error!
// (1324) WHOA WEIRD, unique name bug just went away w/o me knowing how,,
// (1326) aight sweet, both errors are being handled, lgtm, ship!
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  if (contacts.find(c => c.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  
  const contact = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  // console.log('creating new contact', contact)

  contacts = contacts.concat(contact)
  response.json(contact)
  console.log('contacts updating to:', contacts)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})