const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit(1)
} else if (process.argv.length === 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://romashkoyp:${password}@cluster0.9iyubgl.mongodb.net/phonebookApp?retryWrites=true&w=majority`

  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  Person.find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length > 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://romashkoyp:${password}@cluster0.9iyubgl.mongodb.net/phonebookApp?retryWrites=true&w=majority`

  mongoose.connect(url)

  const name = process.argv[3]
  const number = process.argv[4]

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} ${number} to the phonebook`)
    mongoose.connection.close()
  })
}
