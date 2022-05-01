require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
//import Routes 
const homeRoutes = require('./routes/home')
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

//express app
const app = express()

//set view engine defaults
app.set('view engine','ejs')

//to use form data
app.use(express.urlencoded({ extended:true }));

//to user json
app.use(express.json());
//static files
app.use(express.static('public'))


//Routes
app.use('/',homeRoutes)
app.use('/auth',authRoutes)
app.use('/blogs',blogRoutes)
app.use('/users',userRoutes)

//Undefined routes handled
app.use((req,res)=>{
    res.send('404 not found')
})

//Database Connection
mongoose.connect(process.env.DB).then(()=>{
    console.log('Connected to database');
    //Server port reading from env file
    const PORT = process.env.PORT || 6000
    app.listen(PORT,()=>{
        console.log(`Server started listning on ${PORT}`);
    })
}).catch(err=>{
    console.log('error in connecting to database ',err);
})