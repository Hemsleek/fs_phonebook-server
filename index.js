const express = require('express')
const app = express()

let persons = [
    { name: 'Arto Hellas', number: '040-123456', id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id:2 },
    { name: 'Dan Abramov', number: '12-43-234345', id:3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id:4 }
  ] 

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
     persons = persons.filter(person => person.id === parseInt(id))
    if(!person.length) return res.send(`person with id: ${id} not found`)
    res.json(persons)

})

app.delete('/api/persons/:id', (req, res) => {
    const { id } = req.params
    persons = persons.filter(person => person.id !== parseInt(id))
    res.status(204).end()
})

const PORT = 3030

app.listen(PORT ,() => { 
    console.log(`server is running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})