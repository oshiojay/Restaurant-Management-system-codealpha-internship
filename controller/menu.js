const menuModel = require('../model/menu')

exports.createMenu = async (req, res) => {
    try {
        const {name, description, price} = req.body 
        const newMenu = new menuModel({
            name,
            description,
            price: `₦${price}`
        })

        await newMenu.save()
        res.status(201).json({
            message: "Menu created",
            data: newMenu
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


exports.getOneMenu = async (req, res) => {
    try {
        const {menuId} = req.params
        const menu = await menuModel.findOne({_id: menuId})
        if (!menu) {
            return res.status(404).json({
                message: "Menu not found"
            })
        }
        res.status(200).json({
            message: "Menu found",
            data: menu
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.getAllMenus = async (req, res) => {
    try {
        const menus = await menuModel.find()
        res.status(200).json({
            message: "Menus found successfully",
            count: menus.length,
            data: menus
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.updateMenu = async (req, res) => {
    try {
        const {menuId} = req.params
        const {name, description, price} = req.body
        const existingMenu = await menuModel.findOne({_id: menuId})
        if (!existingMenu) {
            return res.status(404).json({
                message: "Menu not found"
            })
        }
        const updatedMenu = await existingMenu.updateOne({
            name,
            description,
            price: `₦${price}`
        })
        res.status(200).json({
            message: "Menu updated",
            data: updatedMenu
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.deleteMenu = async (req, res) => {
    try {
        const {menuId} = req.params
        const existingMenu = await menuModel.findOne({_id: menuId})
        if (!existingMenu) {
            return res.status(404).json({
                message: "Menu not found"
            })
        }
        await existingMenu.deleteOne()
        res.status(200).json({
            message: "Menu deleted"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}