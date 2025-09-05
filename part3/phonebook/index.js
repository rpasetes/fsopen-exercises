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

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.send(`
        <p>Phonebook has info for ${people.length} people</p>
        <p>${new Date(Date.now())}</p>
      `)
    })
    .catch(error => error(next))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log('receiving request data:', body)
  
  // (1050) now moving validation to db + errorHandler!
  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: 'name or number missing'
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
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      } else {
        return response.json(person)
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  
  Person.findByIdAndUpdate(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

// (1056) hell yea now we also returning the error msg json
// this'll make the frontend way easier to make serviceable
const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})