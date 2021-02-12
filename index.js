const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(express.static('build'))
app.disable('x-powered-by')
app.use(cors())
morgan.token('body' , (req,res)=> JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
    { name: 'Arto Hellas', number: '040-123456', id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id:2 },
    { name: 'Dan Abramov', number: '12-43-234345', id:3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id:4 }
  ] 

  const generateId = () => persons.length>0? Math.max(...persons.map(person => person.id)) + 1 :1


app.get('/' , (req, res) => {
    res.json({ message:"we are here 😎🔥" })
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)

})

app.get('/api/persons/:id', (req, res) => {
    const { id } = req.params
     person = persons.filter(person => person.id === parseInt(id))
    if(!person.length) return res.send(`person with id: ${id} not found`)
    res.json(person)

})

app.post('/api/persons', (req, res) =>{
    let newContact = req.body
    if(!newContact.name || !newContact.number) return res.status(400).send(`name / number not supplied`)
    const personExist = persons.some(person => person.name===newContact.name)
    if(personExist) return res.status(400).send(`${newContact.name} already exist,name must be unique`)
    newContact.id = generateId()
    persons = persons.concat(newContact)
    res.json(newContact)
})

app.delete('/api/persons/:id', (req, res) => {
    const { id } = req.params
    persons = persons.filter(person => person.id !== parseInt(id))
    res.status(204).end()
})

const PORT = process.env.PORT || 3031

app.listen(PORT ,() => { 
    console.log(`server is running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})