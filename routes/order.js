const router = require('express').Router();
const {makeOrder, getOneOrder, getAllOrders} = require('../controller/order')
const {authenticate, userAuth} = require('../middleware/auth')

router.post('/makeOrder/:tableId/:menuId', authenticate, userAuth, makeOrder)
router.get('/getOne/:orderId', getOneOrder)
router.get('/getAll', getAllOrders)

module.exports = router;