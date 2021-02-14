const mongoose = require("mongoose")

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
        required:true
    },
    number:{
        type:String,
        required:true
    }
},{timestamps:true})

contactSchema.set('toJSON',{
    transform:(doc , returnedObj) =>{
        returnedObj.id =returnedObj._id.toString() 
        delete returnedObj._id
        delete returnedObj.__v
    }
})

 module.exports = mongoose.model('Person' , contactSchema)