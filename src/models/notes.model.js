const mongoose = require("mongoose")


const notesSchema = new  mongoose.Schema({
    tittle:String,
    description:String
})

const notesModel = mongoose.model("User" , notesSchema)

module.exports = notesModel