const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('give me that password')
  process.exit(1)
}

const password = process.argv[2]
const dbUrl = `mongodb+srv://fullstack:${password}@cluster0.8cmno.mongodb.net/phonebook?retryWrites=true&w=majority`

const mongoConfig = {
  useUnifiedTopology:true,
  useNewUrlParser:true,
  useCreateIndex:true
}
mongoose.connect(dbUrl ,mongoConfig )

const contactSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  number:{
    type:String,
    required:true
  }
})

const Person = mongoose.model('Person', contactSchema)

if(process.argv.length ===3){
  Person.find({}).then(people => {
    console.log('Phonebook:')
    people.forEach(person => {console.log(person.name ,person.number)})
    process.exit(1)
  })

}
if(process.argv.length >3){

  const name = process.argv[3]
  const number = process.argv[4]
  const newPerson = {
    name,
    number
  }
  new Person(newPerson).save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    process.exit(1)
  })

}

