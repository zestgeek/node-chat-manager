const ConnectionManager = require('./ConnectionManager')
const SocketHandler = require('./SocketHandler')

class ChatManager {
    /**
     * Constructor
     * @param { SocketIO } io - socket io which will be passed to socket handler
     */
    constructor (io) {
        this.manager = new ConnectionManager()
        this.handler = new SocketHandler(io)

        this.sendEvent = this.sendEvent.bind(this)
        this.sendError = this.sendError.bind(this)
    }

    /**
     * send event with data to participants
     * @param { string } event - event name to send
     * @param { any } data - event payload to send
     * @param { array } participants - participants list to which we will send event with data
     * @param { socket } socket - socket from which we have to send data
     */
    sendEvent (event, data, participants, socket) {
        const participantsSocketList = participants.map(
            participant => this.manager.connections[participant] || []
        )

        const onlineParticipantSocketList = participantsSocketList.filter(
            socketList => socketList.length
        )

        const socketListToSendData = [].concat(...onlineParticipantSocketList)

        socketListToSendData.forEach(
            socketId => socket.broadcast.to(socketId).emit(event, data) 
        )
    }

    /**
     * send error to provided socket
     * @param { socket } socket - socket connection to send error to
     * @param { string } error - error message
     */
    sendError (socket, error) {
        socket.emit('serverError', error)
    }

    /**
     * create initial configuration
     */
    initiate () {
        this.handler.initiate(socket => {
            let socketUserID = null
                
            socket.on('connectToSocket', data => {
                const { userId } = data
        
                if (!userId) {
                    sendError(socket, 'userId is required when emitting connectToSocket event')
        
                } else {
                    this.manager.addConnection(userId, socket.id)
                    socketUserID = userId
                }
            })
        
            socket.on('disconnect', () => {
                this.manager.removeUserConnection(socketUserID, socket)
                socketUserID = null
            })
        
            socket.on('sendMessage', data => {
                const { participants, ...restMessagePayload } = data
        
                if (!participants.length) {
                    this.sendError(socket, 'participants is required when emitting sendMessage event')
                }
        
                this.sendEvent('receivedMessage', restMessagePayload, participants, socket)
            })
        })
    }
}

module.exports = ChatManager
