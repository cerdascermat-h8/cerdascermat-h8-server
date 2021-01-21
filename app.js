// const { SSL_OP_NO_COMPRESSION } = require('constants')

if(process.env.NODE_ENV != 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 4000

///socket room
const http = require('http')
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)

let users = []

const messages = {
    //rom name ex :
    newbie: [],
    skilled: [],
    proPlayer: [],
    nightmare: []
}

io.on('connection', socket => {
    socket.on('join server', (username) => {
        const user = {
            username,
            id : socket.id
        }
        users.push(user) // state users
        io.emit('new user', users)
    })

    socket.on('join room', (roomName, cb) => {
        socket.join(roomName)
        cb(messages[roomName])
        // socket.emit('has join', messages[roomName])
    })

    socket.on('send message', ({ content, to, sender, chatName, isChannel }) => {
        if(isChannel) {
            const payload = {
                content, chatName, sender
            }

            socket.to(to).emit('new message', payload)
        } else {
            const payload = {
                content, 
                chatName : sender,
                sender
            }
            socket.to(to).emit('new message', payload)
        }

        if (messages[chatName]) {
            messages[chatName].push({
                sender,
                content
            })
        }
    })

    socket.on('disconnect', () => {
        users = users.filter(u => u.id !== socket.id)
        io.emit('new user', users)
    })
})


app.listen(port,() => {
    console.log(`Listen on port ${port}`)
})