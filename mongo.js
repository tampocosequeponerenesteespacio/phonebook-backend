const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
  `mongodb+srv://tampoco:${password}@cluster0.wj2s6.mongodb.net/phone-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    
  })

  const Person = mongoose.model('Person', personSchema)
  
  const person = new Person({
    name: newName,
    number: newNumber
  })
  
if (process.argv.length < 4) {
    console.log('phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name+' '+person.number);
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(
            'added '+person.name+' '+person.number+' to the phonebook'
        )
        mongoose.connection.close() 
    })
       
    
} 

