/**
 * Connection Manager class responsible for managing user connections
*/
class ConnectionManager {
    constructor () {
        this.connections = {}

        this.getConnections = this.getConnections.bind(this)
        this.addConnection = this.addConnection.bind(this)
        this.removeUserConnection = this.removeUserConnection.bind(this)
    }

    /**
     * Find connections from connections list
     * @param {string} userId - The identifier of user to find connections from
     */
    getConnections (userId) {
        return this.connections[userId]
    }

    /**
     * Add a new socket connection
     * @param {string} userId - The identifier of user
     * @param {string} socketId - The socket id to add
     */
    addConnection (userId, socketId) {
        if (this.getConnections(userId)) {
            this.connections[userId] = this.connections[userId].concat(socketId)
    
        } else {
            this.connections[userId] = [socketId]
        }

        console.log(this.connections)
    }

    /**
     * Remove a socket connection
     * @param {string} userId - The identifier of user
     * @param {string} socket - The socket to remove
    */
   removeUserConnection (userId, socket) {
        const userConnections = this.getConnections(userId)

        if (userConnections) {
            const remainingConnections = userConnections.filter(existingSocket => existingSocket !== socket.id)

            if (remainingConnections.length) {
                this.connections[userId] = remainingConnections

            } else {
                delete this.connections[userId]
            }
        }

        console.log(this.connections)
    }

}

module.exports = ConnectionManager
