const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        ingredient: {
            type: String,
            required: true,
            unique: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        unit: {
            type: String,
            required: true
        },

        minimumStock: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const inventoryModel = mongoose.model("Inventory", inventorySchema);

module.exports = inventoryModel;