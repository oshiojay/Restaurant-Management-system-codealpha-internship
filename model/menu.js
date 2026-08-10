const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true
    }
}, {timestamps: true})

const menuModel = mongoose.model('Menu', menuSchema)

module.exports = menuModel
