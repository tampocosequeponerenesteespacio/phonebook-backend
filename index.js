const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.use(express.static('build'))
app.use(cors())
app.use(express.json())


morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res)
  ].join(' ')
}))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
 
  res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`
    <div>
    <h1>The phonebook has info for ${persons.length} people</h1>
    <h3>${new Date()}</h3>
    </div>
    `)
})

const generateId = () => {
  const randomId = Math.floor(Math.random() * (10000000))
  return randomId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name and/or number missing' 
    })
  } else if ( persons.some( p => p.name.toLowerCase() === body.name.toLowerCase() ) ) {
    return response.status(400).json({ 
        error: 'name must be unique'
    })
  }
    const person = {
    id: generateId(),
    name: body.name,  
    number: body.number    
    
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