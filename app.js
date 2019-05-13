const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const ChatManager = require('./modules/ChatManager')

const chatManager = new ChatManager(io)

chatManager.initiate()

chatManager.onEmit('receivedMessage', data => {
    console.log(data)
})

chatManager.onEmit('receivedMessage', data => {
    console.log(data, 'hello')
})

server.listen(8000, () => console.log('Started server on 8000'))

app.get('/', (_, response) => {
    response.sendFile(__dirname + '/index.html')
})