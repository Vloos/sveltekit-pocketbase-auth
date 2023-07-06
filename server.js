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
  
  const socketsRooms = new Map()

  io.on('connection', (socket) => {
    const {partida, token} = socket.handshake.auth;
    // unir el socket a la sala que tenga el nombre del id de la partida.
    socket.join(partida)
    // guardar el socket en colección de sockets. Cuando se crea una nueva sala, se crea un map que contendrá los sockets de la sala
    if (!socketsRooms.get(partida)) socketsRooms.set(partida, new Map())
    // Meter al usuario en el map de la sala. 
    // Con esto, si el usuario A está en partida X e Y, pero conectado solo a partida Y, personajes de la partida X no lo encuentren conectado a la partida X, y no le puedan enviar mensajes.
    socketsRooms.get(partida).set(token, socket);
    // Se mana el mensaje que confirma la unión a una sala
    socket.to(partida).emit('s:roomunir', token);
  

    /* Que pasa cuando el socket se desconecta */
    socket.on('disconnect', () => {
      socket.to(partida).emit('s:roomsalir', token)
      // Se borra al usuario de la lista de usuarios de la sala
      socketsRooms.get(partida).delete(token)
    });
  
  
    /* Que pasa cuando se reciven datos de un personaje*/
    socket.on('c:pj', (data, {idSala, para}) => {
      // entiendase que si no hay idJ, el pj es para el dj de la sala
      // si hay idJ, el pj es para ese jugador
      const cliente = socketsRooms.get(idSala).get(para)
      if (cliente){
        cliente.emit('s:pj', { data, j: token });
      } else {
        socket.emit('s:error', data='Participante sin conexión')
      }
    });

    /**
     * mensajes de chat
     * tipo: simple | tirada | objeto | ..... (según lo que se envíe)
     * data: el mensaje
     */
    socket.on('c:chat', (data, tipo) => {
      // generar un id que va a ser la id del emisor del mensaje y la fecha
      data.id = `${token}_${Date.now()}`
      socket.to(partida).emit('s:chat', data, {j:token, tipo});
    })

    /**
     * Borra mensaje de chat
     * solo los DJ pueden borrar
     * data: id del mensaje
     */
    socket.on('c:chat:borra', (data) => { 
      socket.to(partida).emit('s:chat:borra', data);
    })
  });
}
