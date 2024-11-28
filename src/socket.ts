import {Server, Socket} from "socket.io"

const socketHandler = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('New client connected', socket.id);

        socket.on('joinRoom', (room: string) => {
            socket.join(room)
            console.log(`${socket.id} join room ${room}`);
        })

        socket.on('disconnect', () => {
            console.log('client disconnect', socket.id);
            
        })
    })
}

export default socketHandler