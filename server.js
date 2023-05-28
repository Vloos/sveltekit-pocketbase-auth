import { Server } from "socket.io";
import Dotenv from 'dotenv'
Dotenv.config()

export default function socketServer(){
  // Configuración para permitir todos los origenes (desarrollo)
  const corsOptionsDev = {
    origin: '*',
  };
  
  // Configuración para permitir solo un origen específico (despliegue)
  const corsOptionsProd = {
    origin: process.env.ORIGIN
  };
  
  // Determinar qué configuración utilizar según el entorno
  const corsOptions = process.env.NODE_ENV === 'production' ? corsOptionsProd : corsOptionsDev;
  const port = process.env.PUBLIC_SOCKETPORT || 8000
  
  const io = new Server(port,{cors: corsOptions})
  console.log(`Escuchando sockets en puerto ${port}`);
  
  
  const socketsMap = new Map();
  const socketsDj = new Map();
  
  io.on('connection', (socket) => {
    console.log('Conectado:', socket.handshake.auth);
    const {partida, token} = socket.handshake.auth;
    // unir el socket a la sala que tenga el nombre del id de la partida.
    socket.join(partida)
    socket.to(partida).emit('s:roomunir', token);
  
    // guardar el socket en colección de sockets. La id del usuario es la clave del mapa.
    socketsMap.set(token, socket)
  
    // El caso es que el usuario conectado, si es pj, puede sacar la id del dj de la bd
    //Si el usuario es dj, se guarda en map la id de la partida, y el socket del dj
    if (socket.handshake.auth.role === 'dj') socketsDj.set(partida, socket)
  
    
    /* Que pasa cuando el socket se desconecta */
    socket.on('disconnect', () => {
      console.log('desconectado::', socket.handshake.auth.token);
      socket.to(partida).emit('s:roomsalir', token)
    });
  
  
    /* Que pasa cuando se reciven datos de un personaje*/
    socket.on('c:pj', (data, {idSala, idJ}) => {
      // entiendase que si no hay idJ, el pj es para el dj de la sala
      // si hay idJ, el pj es para ese jugador
      const cliente = idJ ? socketsMap.get(idJ) : socketsDj.get(idSala)
      cliente.emit('s:pj', { msg: data, j: socket.handshake.auth.token });
    });
  });
}
