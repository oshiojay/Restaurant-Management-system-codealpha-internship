const router = require('express').Router()
const { createMenu, getOneMenu, getAllMenus, updateMenu, deleteMenu } = require('../controller/menu')
const {menuValidator} = require('../middleware/validator')

router.post('/', menuValidator, createMenu)
router.get('/getOne/:menuId', getOneMenu)
router.get('/getAll', getAllMenus)
router.put('/update/:menuId', updateMenu)
router.delete('/delete/:menuId', deleteMenu)

module.exports = router