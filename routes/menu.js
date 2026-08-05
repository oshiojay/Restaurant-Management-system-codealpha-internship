const router = require('express').Router()
const { createMenu } = require('../controller/menu')
const {} = require('../middleware/validator')

router.post('/', createMenu)

module.exports = router