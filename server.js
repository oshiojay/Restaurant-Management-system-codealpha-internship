require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT


const userRoutes = require('./routes/user')
const menuRoutes = require('./routes/menu')
const tableRoutes = require('./routes/table')
const orderRoutes = require('./routes/order')
const reservationRoutes = require('./routes/reservation')
const inventoryRoutes = require('./routes/inventory')


const app = express();
app.use(express.json());


app.use('/api/v1/user', userRoutes)
app.use('/api/v1/menu', menuRoutes)
app.use('/api/v1/table', tableRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/reservation', reservationRoutes)
app.use('/api/v1/inventory', inventoryRoutes)

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Database is connected');
    app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
}).catch((error)=>{
    console.log('Unable to connect:', error.message);
    
})
