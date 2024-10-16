require('dotenv').config()
//async errors 


const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not.found.js')
const errorMiddleware = require('./middleware/errorhandle.js')

//middleware
app.use(express.json())


//routes

app.get('/',(req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/Tasks">Tasks route</a>')
})

// Tasks route

app.use(notFoundMiddleware)
app.use(errorMiddleware)