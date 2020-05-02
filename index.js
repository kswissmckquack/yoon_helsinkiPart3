const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function(req) {return JSON.stringify(req.body)})

const logger = morgan(':body :method :url :status :res[content-length] - :response-time ms')

app.use(logger)

let persons = [
  {
    name:"arto hellas",
    phoneNumber:"040-123456",
    id:1
  },
  {
    name:"joseph stalin",
    phoneNumber:"040-2345",
    id:2
  },
  {
    name:"enrique eglasias",
    phoneNumber:"040-99876",
    id:3
  },
  {
    name:"wilmer valderahma",
    phoneNumber:"001-11234",
    id:4
  }
]

const generateId = () => {
    return Math.floor(Math.random()*10000)
}



app.get('/', (req,res) => {
  res.send(`<h1>Welcome My Friend</h1>`)
})

app.get('/api/persons', (req,res) => {
  res.json(persons)
})

app.get('/info', (req,res) => {
  const date = new Date()
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if(person){
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons/', (req,res) => {
  const body = req.body
  const name = body.name
  const phoneNumber = body.phoneNumber
  const person = {
    name: name,
    phoneNumber: phoneNumber,
    id: generateId()
  }
  if(!name){
    return res.status(400).json({
      error: `name missing`
    })
  } if (!phoneNumber){
    return res.status(400).json({
      error: `phone number missing`
    })
  } if(persons.find(p => p.name === name)) {
    return res.status(400).json({
      error: `names must be unique ${name} already exists`
    })
  }
  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if(person){
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
