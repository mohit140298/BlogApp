const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    }
}, { timestamps: true })

const User = mongoose.model('blogs', blogSchema);

module.exports = User