const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const ConnectionManager = require('./modules/ConnectionManager')
const SocketHandler = require('./modules/SocketHandler')

const sendError = (socket, error) => {
    socket.emit('serverError', error)
}

const manager = new ConnectionManager()
const handler = new SocketHandler(manager, io)

// to initiate the handler
handler.initiate()

server.listen(8000, () => {
    console.log('8000')
})

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})