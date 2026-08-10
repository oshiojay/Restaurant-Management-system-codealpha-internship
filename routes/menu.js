const router = require('express').Router()
const { createMenu } = require('../controller/menu')
const {menuValidator} = require('../middleware/validator')

router.post('/', menuValidator, createMenu)

module.exports = router