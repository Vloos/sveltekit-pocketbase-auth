import io from 'socket.io-client'
import { browser } from '$app/environment'
import { env } from '$env/dynamic/public'
import { writable } from 'svelte/store';

export let mensajeDesdeServidor = writable()

console.log('socketport', env.PUBLIC_SOCKETPORT) 

let socket
const url = browser ? window.parent.location.hostname : ''
console.log('Url de socket io: ', url);


export function conexion(userId, partidaId){
  // comprobar en la bd si el director de partidaId es userId. Si es, role es 'dj', si no, role es 'pj'
  let role = ''

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
    if(res.type === 'success') role = res.data
    socketConfig(userId, partidaId, role)
  })
  .catch(err =>{
    console.log(err);
  })
}


function socketConfig(userId, partidaId, role){
  socket = io.connect(`http://${url}:${env.PUBLIC_SOCKETPORT}`,{
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


  // cuando recive un personaje desde el servidor
  socket.on('s:pj', (data,{de}) => {
    mensajeDesdeServidor.set({data, de})
  })


  // cuando se une a una sala
  socket.on('s:roomunir', (token) => {
    console.log('Usuario unido a la partida:' + token);
    // Ir a la bd y sacar la lista de jugadores (nombre e id) para identificar a los jugadores de la sala, los que entran y los que salen.
  })


  // cuando sale de una sala
  socket.on('s:roomsalir', (token) => {
    console.log('Usuario sale de la partida:' + token);
  })

  // cuando el servidor de sockets envía un error
  socket.on('s:error', data => {
    console.error(`Error: ${data}`)
  })

}


/**
 * Envía datos por el socket
 * @param {String} evtName nombre del evento al que atiende el servidor
 * @param {Any} data datos enviados por el socket
 * @param {{idSala: String, para: String }} ids id de la sala, id del jugador destino
 */
export function mandaSocket(evtName, data, ids){
  if (socket){
    socket.emit(evtName, data, ids)
  } else{
    console.error('No se puede transmitir')
  }
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