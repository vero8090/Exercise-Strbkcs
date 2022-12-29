const express = require('express')
const app = express()
app.use(express.json()) //body parser: mengambil data yang dikirimkan oleh client melalui body
const cors = require('cors')
app.use(cors())

// const {get} = require('http')
const PORT = 5010


const {router} = require('./routers')

app.get('/', (req,res)=>{
    res.status(201).send('<h1>Welcome to Home</h1>')
})

app.use('/users', router)

app.listen(PORT, ()=>console.log(`API Running on Port ${PORT}`))