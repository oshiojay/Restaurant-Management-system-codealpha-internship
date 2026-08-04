require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT


const userRoutes = require('./routes/user')


const app = express();
app.use(express.json());


app.use('/api/v1/user', userRoutes)

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Database is connected');
    app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
}).catch((error)=>{
    console.log('Unable to connect:', error.message);
    
})