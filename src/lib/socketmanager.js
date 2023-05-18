import io from 'socket.io-client'

let socket


// TODO como recuperar la verdadera url a la que conectarse?
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
    socketConfig(userId, partidaId, role)
  })
  .catch(err =>{
    console.log(err);
  })
}


function socketConfig(userId, partidaId, role){
  socket = io.connect(url,{
    auth: {
      token: userId,
      partida: partidaId,
      role,
    },
    reconnection: false
  })

  
  // cuando se conecta
  socket.on("connect", () => {
    console.log('sa conectao:', role)
    //si role es 'dj', cambiar en la partida 'jugando' a true
    if (role === 'dj'){
      //setJugando(true, partidaId)
    }    
    //notifications.info(`Sesión de juego iniciada como ${role === 'dj' ? 'director' : 'jugador'}`, 2000)
  });


  // cuando se desconecta
  socket.on("disconnect", () => {
    // si role es 'dj', cambiar en la partida 'jugando' a false
    if (role === 'dj'){
      //setJugando(false, partidaId)
    }
    console.log(`Desconectado de ${url}`);
    //notifications.info(`Sesión de juego finalizada`, 2000)
  });


  // cuando recive una respuesta normal
  socket.on('s:respuesta', data => {
    console.log(data.msg);
  })


  // cuando se une a una sala
  socket.on('s:roomunir', () => {
    console.log('Usuario unido a la partida');
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



function setJugando(jugando, id) {
  const body = JSON.stringify({id, jugando})
  fetch('/api/partida', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'type': 'jugar' },
    body
  })
  .then(res => res.json())
  .then(res => {
    if (res.type === 'success') {
      console.log((jugando ? 'Conectado a ' : 'Desconectado de ') + id);
    }
  })
  .catch(err => {
    console.log(err)
  })
}