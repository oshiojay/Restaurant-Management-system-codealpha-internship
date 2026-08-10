const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
    type: String,
    enum: ["pending", "preparing", "ready", "served", "cancelled"],
    default: "pending"
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table'
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel
