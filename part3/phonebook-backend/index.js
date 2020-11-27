require('dotenv').config() // Environment variables from dotenv library
const express = require('express') // Async requests
const app = express()
const morgan = require('morgan') // Simple server
const cors = require('cors')
const Person = require('./models/person') // Person model with mongoose definitions

morgan.token('data', function getData (req) {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
//app.use(morgan("tiny"))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
  //mongoose.connection.close()
})

app.get('/info', (req, res) => {
  Person.estimatedDocumentCount(
    (err, count) => {
      if (err){
        console.log('error')
      }else{
        res.send(
          `<p>Phonebook has information for ${count} people.</p>
          <p>${Date()}</p>`
        )
      }
    }
  )
})

/*
const generateId = () => {
  return Math.round(Math.random() * (99999 - 1) + 1);
}
*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (body.number === undefined) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  /*
  if (Person.find(p => p.name === body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  */

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        return response.status(404).json({
          error: 'not found'
        })
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(response.status(204).end())
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

/* Express Error Handler Middleware */
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)