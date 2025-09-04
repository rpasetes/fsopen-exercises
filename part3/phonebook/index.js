require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))

const cors = require('cors')
const person = require('./models/person')
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

// (1536) filtering in mongoose starts with .find...()
// (1539) will handle errors in next() (hehe) exercise,
// but can just log the error to console for now...
// (1541) looks like deleting Ada was persistent! SHIP 
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => 
      console.error(error)
    )
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('receiving request data:', body)
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  // (1535) functionality suited for put request, will delete
  // if (contacts.find(c => c.name === body.name)) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(people => {
    console.log(`added ${body.name} number ${body.number} to phonebook`)
    response.json(people)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})