require('dotenv').config()

const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(express.static('build'))
app.disable('x-powered-by')
app.use(cors())
morgan.token('body' , (req,res)=> JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/' , (req, res) => {
    res.json({ message:"we are here 😎🔥" })
})

app.get('/api/persons', (req, res) => {

    Person.find({}).then(response => {
        res.json(response)
    }).catch(err => { console.log(err) })

  })

app.get('/info', (req, res,next) => {
    Person.countDocuments({}).then((count) =>{
        res.send(`<p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
        `)}).catch(err => next(err))

})

app.get('/api/persons/:id', (req, res,next) => {
    const { id } = req.params
    Person.findById(id).then(contact => {
        if(contact) return res.json(contact)
        else return res.status(404).end()
    }).catch(err =>  next(err))
   

})

app.post('/api/persons', (req, res,next) =>{
    let newContact = req.body
    if(!newContact.name || !newContact.number) return res.status(400).send(`name / number not supplied`)
    new Person(newContact).save().then(response => {res.json(response)})
    .catch(err => next(err))

}) 

app.put('/api/persons/:id', (req, res, next) => {

    const {id} = req.params
    const  personUpdate = req.body.number
    Person.findByIdAndUpdate(id,{number: personUpdate},{new:true}).then( updatedPerson => res.json(updatedPerson)).catch(err => next(err))
    
})

app.delete('/api/persons/:id', (req, res) => {
    const { id } = req.params
    
    Person.findByIdAndRemove(id).then(response => res.status(204).end())
    .catch(err =>  next(err))
})


const errorHandler = (err, req, res, next) => {
    console.log(err.message)
    
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
      }
    
      next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3031

app.listen(PORT ,() => { 
    console.log(`server is running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})
