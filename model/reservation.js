const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        tableId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
            required: true
        },

        reservationDate: {
            type: Date,
            default: Date.now
        },

        numberOfGuests: {
            type: Number,
            required: true,
            min: 1
        },

        status: {
            type: String,
            enum: [
                "reserved",
                "completed",
                "cancelled"
            ],
            default: "reserved"
        }
    },
    {
        timestamps: true
    }
);

const reservationModel = mongoose.model("Reservation", reservationSchema);

module.exports = reservationModel;