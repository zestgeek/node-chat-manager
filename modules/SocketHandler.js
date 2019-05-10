/**
 * Socket Handler class responsible for managing socket events
*/
class SocketHandler {
    /**
     * Constructor
     * @param { SocketIO } io - socket io object to bind events on
     */
    constructor (io) {
        this.io = io

        this.initiate = this.initiate.bind(this)
    }

    /**
     * Initiate the socket io connection
     *  @param { function } handlerFunc - handler function which passes socket to outside of this modules developer can easily add events to socket
     */
    initiate (handlerFunc) {
        this.io.on('connection', handlerFunc)
    }
}

module.exports = SocketHandler
