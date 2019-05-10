/**
 * Socket Handler class responsible for managing socket events
*/
class SocketHandler {
    constructor (manager, io) {
        this.io = io
        this.manager = manager

        this.initiate = this.initiate.bind(this)
    }

    initiate () {
        this.io.on('connection', socket => {

            let socketUserID = null
        
            socket.on('connectToSocket', data => {
                const { userId } = data
        
                if (!userId) {
                    // sendError(socket, 'userId is required when emitting connectToSocket event')

                } else {
                    this.manager.addConnection(userId, socket.id)
                    socketUserID = userId
                }
            })

            socket.on('disconnect', () => {
                this.manager.removeUserConnection(socketUserID, socket)
                socketUserID = null
            })
        })
    }
}

module.exports = SocketHandler
