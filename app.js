if(process.env.NODE_ENV != 'development') {
    require('dotenv').config()
}

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

const messages = [{
    name : 'test',
    message: 'server success connect'
}]

io.on('connection', function(socket) {
    console.log(`socket from server`)
    socket.emit('message', messages)
})

server.listen(port, () => {
    console.log(`Listen on port :` + port)
})


// const http = require('http')
// const server = http.createServer(app)
// const socket = require('socket.io')
// const io = socket(server)

///socket room

// let users = []

// const messages = {
//     //rom name ex :
//     newbie: [],
//     skilled: [],
//     proPlayer: [],
//     nightmare: []
// }

// io.on('connection', socket => {
//     socket.on('join server', (username) => {
//         const user = {
//             username,
//             id : socket.id
//         }
//         users.push(user) // state users
//         io.emit('new user', users)
//     })

//     socket.on('join room', (roomName, cb) => {
//         socket.join(roomName)
//         cb(messages[roomName])
//         // socket.emit('has join', messages[roomName])
//     })

//     socket.on('send message', ({ content, to, sender, chatName, isChannel }) => {
//         if(isChannel) {
//             const payload = {
//                 content, chatName, sender
//             }

//             socket.to(to).emit('new message', payload)
//         } else {
//             const payload = {
//                 content, 
//                 chatName : sender,
//                 sender
//             }
//             socket.to(to).emit('new message', payload)
//         }

//         if (messages[chatName]) {
//             messages[chatName].push({
//                 sender,
//                 content
//             })
//         }
//     })

//     socket.on('disconnect', () => {
//         users = users.filter(u => u.id !== socket.id)
//         io.emit('new user', users)
//     })
// })


// app.listen(port,() => {
//     console.log(`Listen on port ${port}`)
// })