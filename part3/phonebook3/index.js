const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('data', function getData (req, res) {
  return JSON.stringify(req.body);
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
//app.use(morgan("tiny"))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "111154654547",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
    var count = persons.length
  res.send(
      `<p>Phonebook has information for ${count} people.</p>
      <p>${Date()}</p>`
  )
})

const generateId = () => {
   return Math.round(Math.random() * (99999 - 1) + 1);
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (persons.find(p => p.name === body.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
