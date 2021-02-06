const express = require('express')
const app = express()

let persons = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
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

const PORT = 3030

app.listen(PORT ,() => { 
    console.log(`server is running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})