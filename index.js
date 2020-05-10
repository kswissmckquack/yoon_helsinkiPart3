require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if(error.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  }
  if(error.name === 'ValidationError'){
    return res.status(400).send({error: error.message})
  }
  next(error)
}
// app.use(errorHandler)
// logger
morgan.token('body', function(req) {return JSON.stringify(req.body)})
const logger = morgan(':body :method :url :status :res[content-length] - :response-time ms')
app.use(logger)


app.get('/', (req,res) => {
  res.send(`<h1>Welcome My Friend</h1>`)
})

app.get('/api/persons', (req,res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(p=> p.toJSON()))
  })
})

app.get('/info', (req,res) => {
  const date = new Date()
  res.send(`
    <p>Phonebook has info for ${Person.length} people</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/:id', (req,res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person.toJSON())
      } else {
        response.status(404).end() //id valid format but no matching found
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req,res,next) => {
  const body = req.body

  const name = body.name
  const phoneNumber = body.phoneNumber
  const person = new Person({
      name: name,
      phoneNumber: phoneNumber
  })

  if(!name){
    return res.status(400).json({
      error: `name missing`
    })
  } if (!phoneNumber){
    return res.status(400).json({
      error: `phone number missing`
    })
  }
  // if(Person.find(p => p.name === name)) {
  //   return res.status(400).json({
  //     error: `names must be unique ${name} already exists`
  //   })
  // }

  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id
  const name = body.name
  const phoneNumber = body.phoneNumber
  const person = {
      name: name,
      phoneNumber: phoneNumber
  }

  Person.findByIdAndUpdate(id, person, {new:true})
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
  const id = req.params.id
  console.log(id)
  Person.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
