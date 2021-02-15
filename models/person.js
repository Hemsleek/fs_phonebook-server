const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.DB_URL

const mongoConfig = {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
}

mongoose.connect(url, mongoConfig)
.then((_) => { console.log('DB CONNETION SUCCESSFUL') })
.catch( err => { console.log('ERR CONNECTING TO DB',err.message) })

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        unique:true,
        required:true
    },
    number:{
        type:String,
        minlength:8,
        required:true
    }
},{timestamps:true})

contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON',{
    transform:(doc , returnedObj) =>{
        returnedObj.id =returnedObj._id.toString() 
        delete returnedObj._id
        delete returnedObj.__v
    }
})

 module.exports = mongoose.model('Person' , contactSchema)