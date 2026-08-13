const router = require('express').Router();
const {createTable,getOneTable,getAllTables} = require('../controller/table')
const {tableValidator} = require('../middleware/validator')

router.post('/', tableValidator, createTable)
router.get('/getOne/:tableNumber', getOneTable)
router.get('/getAll', getAllTables)

module.exports = router;