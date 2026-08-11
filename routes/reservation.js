const routes = require('express').Router()
const {createReservation} = require('../controller/reservation')
const {authenticate} = require('../middleware/auth')
const {} = require('../middleware/validator')

routes.post('/ ', createReservation)

module.exports = routes