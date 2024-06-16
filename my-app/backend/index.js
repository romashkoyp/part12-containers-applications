require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
//const mongoose = require('mongoose')

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data', {
  stream: process.stdout
}))

let persons = [
]

app.get('/api/persons/', (request, response) => {
  if (persons) {
    Person.find({})
      .then(persons => {
        response.json(persons)
      })
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response, next) => {
  const currentTime = new Date().toString()
  Person.estimatedDocumentCount()
    .then((numPersons) => {
      response.send(
        `<p>Phonebook has info for ${numPersons} people</p>
                <p>${currentTime}</p>`
      )
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = persons.length > 0
  ? () => {
    function getRandomInt(min, max) {
      min = Math.ceil(persons.length)
      max = Math.floor(5000)
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    return getRandomInt()
  }
  : () => 0

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'The name or number is missing'
    })
  } else if (persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())) {
    return response.status(400).json({
      error: 'The name already exists in the phonebook'
    })
  }

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})