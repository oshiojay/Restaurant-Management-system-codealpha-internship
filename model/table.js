const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tableSchema = new Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
     status: {
      type: String,
      enum: ["available", , "reserved"],
      default: "available",
    },
}, {timestamps: true})


const tableModel = mongoose.model('Table', tableSchema)

module.exports = tableModel;