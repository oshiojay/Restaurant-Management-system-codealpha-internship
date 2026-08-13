const inventoryModel = require("../model/inventory");

exports.createInventory = async (req, res) => {
    try {
        const {ingredient, quantity, unit, minimumStock} = req.body;
        const existingInventory = await inventoryModel.findOne({ingredient});
        if (existingInventory) {
            return res.status(400).json({
                message: "Ingredient already exists"
            })
        }
        const newInventory = new inventoryModel({
            ingredient,
            quantity,
            unit,
            minimumStock
        })
        await newInventory.save()
        res.status(201).json({
            message: "Inventory created",
            data: newInventory
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.getOneInventory = async (req, res) => {
    try {
        const {ingredient} = req.params
        const inventory = await inventoryModel.findOne({ingredient})
        if (!inventory) {
            return res.status(404).json({
                message: "Inventory not found"
            })
        }
        res.status(200).json({
            message: "Inventory found",
            data: inventory
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.getAllInventory = async (req, res) => {
    try {
        const inventories = await inventoryModel.find()
        res.status(200).json({
            message: "Inventories found successfully",
            count: inventories.length,
            data: inventories
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.updateInventory = async (req, res) => {
    try {
        const {ingredient} = req.params
        const {quantity, unit, minimumStock} = req.body
        const existingInventory = await inventoryModel.findOne({ingredient})
        if (!existingInventory) {
            return res.status(404).json({
                message: "Inventory not found"
            })
        }
        const updatedInventory = await existingInventory.updateOne({
            quantity,
            unit,
            minimumStock
        })
        res.status(200).json({
            message: "Inventory updated",
            data: updatedInventory
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}