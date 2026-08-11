const reservationModel = require("../model/reservation");
const tableModel = require("../model/table");
const userModel = require("../model/user");


exports.createReservation = async (req, res) => {
    try {
        const {userId} = req.user
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

        const newReservations = new reservationModel({
            userId,
            tableId,
            numberOfGuests
        })

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