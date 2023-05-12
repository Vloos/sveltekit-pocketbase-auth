import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log(socket.handshake.auth.token);


        /* Que pasa cuando el socket se desconecta */
        socket.on('disconnect', () =>{
            console.log('desconectado::', socket.handshake.auth.token);
        })


        /* Que pasa cuando se manda un mensaje de prueba*/
        socket.on('c:manda', data => {
            console.log(data);
            socket.emit('s:respuesta', {msg: 'patata'})
        })
    });



    console.log('SocketIO injected');
}
