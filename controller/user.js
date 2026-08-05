const userModel = require('../model/user')
const { sendSingleEmail } = require('../utils/brevo')
const otpGenerator = require('otp-generator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {emailTemplate, sendOTPEmail, resetPasswordTemplate, resetPasswordSuccessfulTemplate} = require('../email')


exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })
        console.log("OTP generated:", otp)
        const otpExpire = Date.now() + (1000 * 60 * 5)

        const newUser = new userModel({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            otp,
            otpExpire
        })
        await newUser.save()

        await sendSingleEmail({
            email: email.toLowerCase(),
            name: name,
            html: emailTemplate(name, otp),
            subject: "Verify your email — OTP"
        })

        res.status(201).json({
            message: 'User created successfully. Please check your email for the OTP to verify your account.',
            data: newUser
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}


exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await userModel.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(404).json({
                message: 'User not found' 
            })
        }
       if(Date.now() > user.otpExpire || user.otp !== otp){
            return res.status(400).json({
                message: "Invalid or expired OTP"
            })
        }

        user.isVerified = true
        await user.save()

        res.status(200).json({
            message: 'Email verified sucessfully',
            data: user
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}


exports.resendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(404).json({
                message: 'User not found' 
            })
        }
        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })
        const otpExpire = Date.now() + (1000 * 60 * 5)
        user.otp = otp
        user.otpExpire = otpExpire
        await user.save()

        await sendSingleEmail({
            email: email.toLowerCase(),
            name: user.name,
            html: sendOTPEmail(user.name, otp),
            subject: "Resend OTP"
        }) 

        res.status(200).json({
            message: 'OTP resent successfully. Please check your email for the new OTP.',
            data: user
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(404).json({
                message: 'User not found' 
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid password'
            })
        }
        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.SECERT_KEY,
            {expiresIn: '1d'}
        )

        res.status(200).json({
            message: 'login successful',
            token, 
            user
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
