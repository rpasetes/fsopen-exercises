require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))

const cors = require('cors')
// (1550) lmao idk wtf this is doing here
// const person = require('./models/person')
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

// (1549) oh also deleting this now we have a frontend dist build
// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${new Date(Date.now())}</p>
  `)
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const contact = contacts.find(c => c.id === id)

  if (!contact) { return response.status(404).end() }
  response.json(contact)
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
    // (1552) yea boop so simple
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('receiving request data:', body)
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(people => {
    console.log(`added ${body.name} number ${body.number} to phonebook`)
    response.json(people)
  })
})

// (1551) aight useful tech, set me up well for catching bugs;
const errorHandler = (error, request, response, next) => {
  console.error(error)

  // (1547) will be useful for next exercise, changing
  // all the '/api/person/:id' routes to access our db
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})