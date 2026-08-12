const tableModel = require('../model/table')


exports.createTable = async (req, res) => {
    try {
        const {tableNumber, capacity} = req.body;
        const existingTable = await tableModel.findOne({tableNumber});
        if (existingTable) {
            return res.status(400).json({
                message: "Table already exists"
            })
        }
        
        const newTable = new tableModel({
            tableNumber,
            capacity
        })
        await newTable.save()
        res.status(201).json({
            message: "Table created",
            data: newTable
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.getOneTable = async (req, res) => {
    try {
        const {tableNumber} = req.params
        const table = await tableModel.findOne({tableNumber})
        if (!table) {
            return res.status(404).json({
                message: "Table not found"
            })
        }
        res.status(200).json({
            message: "Table found",
            data: table
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


exports.getAllTables = async (req, res) => {
    try {
        const tables = await tableModel.find()
        res.status(200).json({
            message: "Tables found successfully",
            data: tables,
            count: tables.length
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

