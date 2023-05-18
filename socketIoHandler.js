import { Server } from 'socket.io';

const socketsMap = new Map();
const socketsDj = new Map();

export default function injectSocketIO(server) {
	const io = new Server(server);

	io.on('connection', (socket) => {
		console.log('Conectado:', socket.handshake.auth);
		const {partida, token} = socket.handshake.auth;
		// unir el socket a la sala que tenga el nombre del id de la partida.
		socket.join(partida)
		io.to(partida).emit('s:roomunir', token);

		// guardar el socket en colección de sockets. La id del usuario es la clave del mapa.
		socketsMap.set(token, socket)

		// El caso es que el usuario conectado, si es pj, puede sacar la id del dj de la bd
		//Si el usuario es dj, se guarda en map la id de la partida, y el socket del dj
		if (socket.handshake.auth.role === 'dj') socketsDj.set(partida, socket)
  
    
    
		

		/* Que pasa cuando el socket se desconecta */
		socket.on('disconnect', () => {
			console.log('desconectado::', socket.handshake.auth.token);
		});


		/* Que pasa cuando se manda un mensaje de prueba*/
		socket.on('c:manda', (data) => {
			console.log(data);
			socket.emit('s:respuesta', { msg: 'patata' });
		});


	});

	console.log('SocketIO injected');
}
