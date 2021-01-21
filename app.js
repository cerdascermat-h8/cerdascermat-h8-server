const { SSL_OP_NO_COMPRESSION } = require('constants')

if(process.env.NODE_ENV != 'development') {
    require('dotenv').config()
}

const express = require('express')

const app = express()




app.listen(port,() => {
    console.log(`Listen on port ${port}`)
})