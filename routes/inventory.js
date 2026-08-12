const router = require('express').Router()
const {createInventory, getOneInventory, getAllInventory, updateInventory} = require('../controller/inventory')
const {inventoryValidator} = require('../middleware/validator')

router.post('/create', inventoryValidator, createInventory)
router.get('/getone/:ingredient', getOneInventory)
router.get('/getall', getAllInventory)
router.put('/update/:ingredient', updateInventory)

module.exports = router