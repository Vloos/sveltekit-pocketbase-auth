/** @type {import('./$types').RequestHandler} */


/**
 * borra el pj de la partida
 */
export const DELETE = async (event) =>{
  if(!event.locals.user) return new Response('No identificado')
  const data = await event.request.json();
  const {id} = data

  let idJug

  // Buscar el jugador de la campaña que tenga el pj asignado
  try{
    console.log(`pj = "${id}"`)
    idJug = await event.locals.pb.collection('campana_jugadores').getFirstListItem(`pj = "${id}"`)
    idJug = idJug.id
  }catch (err){
    idJug= undefined
  }
  
  // Borrar el pj y devolver el id del jugador con ese pj asignado, para que el cliente haga lo suyo
  try{
    await event.locals.pb.collection('personajes').delete(id)
    return new Response(JSON.stringify({type: 'success', message: 'Personaje borrado', idJug}), {status: 200})
  }catch (err){
    return new Response(JSON.stringify({type: 'error', message: err.message}), {status:200})
  }
}


/**
 * Asigna un pj a un jugador, o libera el pj
 */
export const PATCH = async (event) => {
  if(!event.locals.user) return new Response('No identificado')
  switch(event.request.headers.get('accion')){
    case 'asignarPj':{
      const data = await event.request.json()
      const {pjId, jId} = data

      try{
        await event.locals.pb.collection('campana_jugadores').update(jId, {"pj": pjId, expand: "pj.nombre"})
        return new Response(JSON.stringify({type: 'success', message: 'Personaje asignado'}),{status: 200})
      } catch {
        return new Response(JSON.stringify({type: 'error', message: 'No se pudo asignar'}), {status: 200})
      }
    }

    case 'liberarPj':{
      if(!event.locals.user) return new Response('No identificado')
      const data = await event.request.json();
      const {id} = data
    
      try{
        await event.locals.pb.collection('campana_jugadores').update(id, {"pj": ""});
        return new Response(JSON.stringify({type: 'success', message: 'Personaje retirado'}), {status: 200})
      }catch (err){
        return new Response(JSON.stringify({type: 'error', message: err.message}), {status:200})
      }
    }

    default:
      return new Response(JSON.stringify({type: 'error', message: '¿?'}), {status:418})
  }
}


/**
 * Crea un personaje para la partida
 */
export const POST = async (event) => {
  if(!event.locals.user) return new Response('No identificado')

  const data = await event.request.json()
  try {
    let res = await event.locals.pb.collection('personajes').create(data)
    let pj = await event.locals.pb.collection('v_datos_campa_j').getFirstListItem(`id = "${res.id}"`)
    return new Response(JSON.stringify({type: 'success', message:'Personaje creado', pj}), {status: 200})
  } catch (err) {
    return new Response(JSON.stringify({type: 'error', message:'No se pudo crear el personaje'}), {status: 200})
  }
}