const joi = require('joi');

exports.createUserValidator = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().trim().min(2).required().messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'any.required': 'Name is required'
        }),
        email: joi.string().trim().email().required().messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
            'any.required': 'Password is required',
            'string.empty': 'Password cannot be empty',
            'string.pattern.base': 'Password must be at least 8 characters and include upper and lower case'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()

}


exports.verifyOtpValidator = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().trim().email().required().messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        otp: joi.string().trim().pattern(/^\d{6}$/).required().messages({
            'string.empty': 'OTP is required',
            'string.pattern.base': 'OTP must be a 6-digit number',
            'any.required': 'OTP is required'
        })
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}


exports.loginValidator = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().trim().email().required().messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        password: joi.string().required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.menuValidator = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().trim().min(2).required().messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'any.required': 'Name is required'
        }),
        description: joi.string().trim().required().messages({
            'string.empty': 'Description is required',
            'any.required': 'Description is required'
        }),
        price: joi.number().positive().required().messages({
            'number.base': 'Price must be a number',
            'number.positive': 'Price must be greater than zero',
            'any.required': 'Price is required'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}


exports.tableValidator = (req, res, next) => {
    const schema = joi.object({
        tableNumber: joi.number().required().messages({
            'number.empty': 'Table number is required',
            'any.required': 'Table number is required'
        }),
        capacity: joi.number().required().messages({
            'number.empty': 'Capacity is required',
            'any.required': 'Capacity is required'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}


exports.inventoryValidator = (req, res, next) => {
    const schema = joi.object({
        ingredient: joi.string().trim().min(2).required().messages({
            'string.base': 'Ingredient must be a string',
            'string.empty': 'Ingredient is required',
            'string.min': 'Ingredient must be at least 2 characters long',
            'any.required': 'Ingredient is required'
        }),
        quantity: joi.number().min(0).required().messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity cannot be negative',
            'any.required': 'Quantity is required'
        }),
        unit: joi.string().trim().required().messages({
            'string.empty': 'Unit is required',
            'any.required': 'Unit is required'
        }),
        minimumStock: joi.number().min(0).messages({
            'number.base': 'Minimum stock must be a number',
            'number.min': 'Minimum stock cannot be negative'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}


exports.reservationValidator = (req, res, next) => {
    const schema = joi.object({
        numberOfGuests: joi.number().min(1).required().messages({
            'number.base': 'Number of guests must be a number',
            'number.min': 'Number of guests must be at least 1',
            'any.required': 'Number of guests is required'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

