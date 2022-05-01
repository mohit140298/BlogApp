require('dotenv').config()
const express = require('express');

//import Routes 
const homeRoutes = require('./routes/home')
const blogRoutes = require('./routes/blog')


//express app
const app = express()

//set view engine defaults
app.set('view engine','ejs')

//to use form data
app.use(express.urlencoded({ extended:true }));

//static files
app.use(express.static('public'))


//Routes
app.use('/',homeRoutes)
app.use('/blog',blogRoutes)

//Undefined routes handled
app.use((req,res)=>{
    res.send('404 not found')
})

//Server port reading from env file
const PORT = process.env.PORT || 6000
app.listen(PORT,()=>{
    console.log(`Server started listning on ${PORT}`);
})