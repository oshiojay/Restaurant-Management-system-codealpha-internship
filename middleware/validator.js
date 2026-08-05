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


