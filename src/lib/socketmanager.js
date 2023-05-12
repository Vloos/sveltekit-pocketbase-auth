import io from 'socket.io-client'


let socket
const url = 'http://localhost:3000'

export function conexion(userId, partidaId){
  // comprobar en la bd si el director de partidaId es userId. Si es, role es 'dj', si no, role es 'pj'
  let role = 'pj'
  
  fetch('/api/partida',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      id: partidaId,
      uId: userId,
    },
  })
  .then(res => res.json())
  .then(res =>{
    if(res.type === 'success') role = 'dj'
  })
  .catch(err =>{
    console.log(err);
  })

  socket = io.connect(url,{
    auth: {
      token: userId,
      partida: partidaId,
      role,
    },
    reconnection: false
  })
  
  
  socket.on("connect", () => {
    //TODO si role es 'dj', cambiar en la partida 'jugando' a true
    console.log(`Conectado a ${url}`);
    //notifications.info(`Conectado a ${url}`, 2000)

    //
  });

  socket.on("disconnect", () => {
    //TODO si role es 'dj', cambiar en la partida 'jugando' a false
    console.log(`Desconectado de ${url}`);
    //notifications.info(`Desconectado de ${url}`, 2000)
  });


  socket.on('s:respuesta', data => {
    console.log(data.msg);
  })
}


/**
 * Envía datos por el socket
 * @param {String} evtName nombre del evento al que atiende el servidor
 * @param {Any} data datos enviados por el socket
 */
export function mandaSocket(evtName, data){
  data={...data, de:socket.id}
  if (socket) socket.emit(evtName, data)
}


/**
 * Desconecta el socket
 */
export function desconexion(){
  socket.disconnect()
}
