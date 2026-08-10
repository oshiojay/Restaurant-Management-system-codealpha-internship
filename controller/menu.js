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
