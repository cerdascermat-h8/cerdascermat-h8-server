const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())

const messages = [{
  name : 'welcome',
  message: 'welcome!'
}]

let scoreBoard = []

io.on('connection', (socket) => {
  console.log('socket io client connected')
  socket.emit('init', messages)
  socket.on('newPlayer', (payload) => {
    // console.log(payload)
    scoreBoard.push({
      playerName: payload.name,
      score: payload.score 
    })
    io.emit('playerInfo', scoreBoard)
    socket.on('increaseScore', (payload) => {
      console.log(payload, '<<<< increase score')
      scoreBoard.forEach(player => {
        if(player.playerName === payload.name) {
          player.score += payload.score
        }
      })
      console.log(scoreBoard)
      io.emit('playerInfo', scoreBoard)
    })
    socket.on('decreaseScore', (payload) => {
      console.log(payload, '<<<< decrease score')
      scoreBoard.forEach(player => {
        if(player.playerName === payload.name) {
          player.score -= payload.score
        }
      })
      console.log(scoreBoard)
      io.emit('playerInfo', scoreBoard)
    })
    // socket.broadcast.emit('gameOver', 'game telah selasai')
    socket.on('gameOver', (payload) => {
      // console.log(payload, '<<<<< game over')
      const { playerName, currentScore } = payload
      socket.broadcast.emit('gameOver', `game telah berakhir oleh ${playerName} dengan score ${currentScore}.`)
      scoreBoard = []
    })
  })
})

server.listen(port, () =>{ 
  console.log(`Listening on *:${port}`)
})