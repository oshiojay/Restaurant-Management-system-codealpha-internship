const router = require('express').Router();
const {makeOrder} = require('../controller/order')
const {authenticate} = require('../middleware/auth')

router.post('/makeOrder/:tableId/:menuId', authenticate, makeOrder)

module.exports = router;