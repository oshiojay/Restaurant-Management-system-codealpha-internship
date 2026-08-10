const router = require('express').Router();
const {createTable,getOneTable,getAllTables,updateTable} = require('../controller/table')
const {tableValidator} = require('../middleware/validator')

router.post('/', tableValidator, createTable)
router.get('/getOne/:tableNumber', getOneTable)
router.get('/getAll', getAllTables)
router.put('/update/:tableNumber', updateTable)

module.exports = router;