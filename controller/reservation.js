const reservationModel = require("../model/reservation");
const tableModel = require("../model/table");
const userModel = require("../model/user");


exports.createReservation = async (req, res) => {
    try {
        const {id: userId} = req.user
        const {tableId} = req.params
        const {numberOfGuests} = req.body
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
        if (existingTable.status !== "available") {
            return res.status(400).json({
                message: "Table is not available"
            })
        }

        if (numberOfGuests > existingTable.capacity) {
            return res.status(400).json({
                message: "Number of guests exceeds table capacity"
            })
        }
          
        const newReservations = new reservationModel({
            userId,
            tableId,
            numberOfGuests
        })
        await existingTable.updateOne({status: 'reserved'})
        
        await newReservations.save()

        res.status(200).json({
            message: "Reservation successful",
            data: newReservations
        })

    } catch(error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.getOneReservation = async (req, res) => {
    try {
        const {reservationId} = req.params
        const reservation = await reservationModel.findOne({_id: reservationId})
        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found"
            })
        }
        res.status(200).json({
            message: "Reservation found",
            data: reservation
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.find()
        res.status(200).json({
            message: "Reservations found successfully",
            count: reservations.length,
            data: reservations
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}