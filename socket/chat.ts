import io from 'socket.io-client'

interface UserRegister {
    msg: string
    id: number
}

class ChatSocket {
    URL: string
    socket: SocketIOClient.Socket

    constructor() {
        this.URL = process.env.NEXT_PUBLIC_CHAT_SOCKET_URL || 'http://localhost:5000/chat'
        this.socket = io(this.URL)

        console.log("[Chat] Connected:", this.URL, this.socket)
    }

    emitUserRegister() {
        console.log('emit')
        this.socket.emit('user_register', '/chat', {id: 1})
    }

    onUserRegister() {
        this.socket.on('user_register_on', (data: UserRegister) => {
            console.log(data)
        })
    }
}

export default new ChatSocket()