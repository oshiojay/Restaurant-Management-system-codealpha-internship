const routes = require('express').Router()
const {createReservation, getOneReservation, getAllReservations} = require('../controller/reservation')
const {authenticate, userAuth} = require('../middleware/auth')
const {reservationValidator} = require('../middleware/validator')

routes.post('/create/:tableId', authenticate, userAuth, reservationValidator, createReservation)
routes.get('/getOne/:reservationId', getOneReservation)
routes.get('/getAll', getAllReservations)

module.exports = routes