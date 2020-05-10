const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-cfl2h.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if(process.argv.length >3 ){
  const person = new Person({
    name:process.argv[3],
    phoneNumber:process.argv[4]
  })
  person.save().then(response => {
    console.log(`added ${person.name} ${person.phoneNumber} to phonebook`)
    mongoose.connection.close()
  })
}
