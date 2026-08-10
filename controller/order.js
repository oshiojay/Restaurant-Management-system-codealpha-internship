const orderModel = require('../model/order')
const tableModel = require('../model/table')
const menuModel = require('../model/menu')
const userModel = require('../model/user')


exports.makeOrder = async (req, res) => {
    try {
        const {id: userId} = req.user
        const {tableId, menuId} = req.params
        const existingUser = await userModel.findOne({_id: userId})
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const existingTable = await tableModel.findOne({_id: tableId})
        if (!existingTable) {
            return res.status(404).json({
                message: "Table not found"
            })
        }
        const existingMenu = await menuModel.findOne({_id: menuId})
        if (!existingMenu) {
            return res.status(404).json({
                message: "Menu not found"
            })
        }
        const newOrder = new orderModel({
            userId,
            tableId,
            menuId
        })
        await newOrder.save()
        res.status(201).json({
            message: "Order created",
            data: newOrder
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}
