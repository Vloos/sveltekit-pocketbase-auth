import io from 'socket.io-client'
import { browser } from '$app/environment'
import { env } from '$env/dynamic/public'
import { writable } from 'svelte/store';
import { notifications } from '$lib/notifications';

export let chat = chatStore()
export let pj = writable()


function chatStore(){
  const {subscribe, set, update} = writable(new Map())

  return {
    subscribe,
    borra: (cual) => update((m) => m.delete(cual)),
    update: (que) => update((m) => m.set(que.id, que)),
    reset: () => update(() => new Map()),
  }
}

let socket
const url = browser ? window.parent.location.hostname : ''



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
    //si role es 'dj', cambiar en la partida 'jugando' a true
    if (role === 'dj'){
      setJugando(true, partidaId)
    }    
    notifications.info(`Sesión de juego iniciada como ${role === 'dj' ? 'director' : 'jugador'}`)
  });


  // cuando se desconecta
  socket.on("disconnect", () => {
    // si role es 'dj', cambiar en la partida 'jugando' a false
    if (role === 'dj'){
      setJugando(false, partidaId)
    }
    notifications.info(`Sesión de juego finalizada`)
  });


  // cuando recive un personaje desde el servidor
  socket.on('s:pj', ({data, j}) => {
    pj.set({data, j})
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

  
  //recive mensaje de chat
  socket.on('s:chat', (data, {de, para})  => {
    data.de = de
    data.para = para
    chat.update(data)
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
 * @param {Object} cabecera
 */
export function mandaSocket(evtName, data, cabecera){
  if (socket){
    socket.emit(evtName, data, cabecera)
  } else{
    console.error('No se puede transmitir')
  }
}


/**
 * Desconecta el socket
 */
export function desconexion(){
  socket?.disconnect()
}


/**
 * Supuestamente, cuando un dj empieza sesión de juego, el "jugando" en la campaña que sea, se pone en true.
 * Cuando el dj se desconecta, se pone en false.
 * Encuentro 2 problemas
 * 1. Los jugadores tienen que actualizar la página para ver los cambios en el estado "jugando" de la partida para poder entrar a la sesión.
 * 2. La desconexión que hace este cambio solo funciona cuando el dj navega por la página, pero no si cierra la pestaña o va a una página fuera de Cronista
 * Encuentro soluciones
 * 1. Cuando un dj se conecta o desconecta al servidor de sockets, es el servidor de socket el que actualiza la bd, pero sigue el problema 2
 * 2. Lo gestiona el servidor de sockets...
 *    Al entrar en cronista se conecta a servidor de sockets.
 *    El servidor de sockets se encarga de enviar eventos a la página cuando un dj empieza o termina la sesión, o el usuario es invitado a una partida
 */
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