require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))

const cors = require('cors')
const corsOptions = {
  host: 'http://localhost:5173',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.json())

morgan.token('body', (req, res) => { 
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// contacts = [
//   {
//     "id": "1",
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": "2",
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": "3",
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": "4",
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
// ]
// console.log(contacts)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${new Date(Date.now())}</p>
  `)
})

// (1333) HOLY FARKING SHIP YEA WE GOT IT ON REST VSCODE
// (1334) AND WE HAVE THE CONTACTS ON THE FRONTEND LFGGG
app.get('/api/persons', (request, response) => {
  // response.json(contacts)
  Person.find({}).then(people => {
    response.json(people)
  })
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

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('receiving request data:', body)
  
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

  contacts = contacts.concat(contact)
  response.json(contact)
  console.log('contacts updating to:', contacts)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})