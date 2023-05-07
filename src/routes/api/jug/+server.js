/** @type {import('./$types').RequestHandler} */

export const POST = async (event) =>{
  if(!event.locals.user) return new Response('No identificado')

  const data = await event.request.json();
  const {idCampa, email} = data
  let usuario

  // que el usuario invitado no sea el mismo que invita
  if (event.locals.user.email === email) {
    return new Response(JSON.stringify({type: 'error', message: 'El usuario no puede invitarse a si mismo'}), {status: 200})
  }

  try{
    //comprobar que el usuario existe
    usuario = await event.locals.pb.collection('users').getFirstListItem(`email = "${email}"`)
  }catch (err){
    return new Response(JSON.stringify({type: 'error', message: 'El usuario no se puede encontrar'}), {status:200})
  }


  try{
    //comprobar que el usuario no ha sido previamente invitado
    await event.locals.pb.collection('campana_jugadores').getFirstListItem(`campana="${idCampa}" && usuario="${usuario.id}"`)
    return new Response(JSON.stringify({type: 'error', message: 'El jugador ya está en la campaña'}), {status:200})
  }catch (err){
    
    // montando datos de invitación (no es realmente invitación, más bien es meter directamente al usuario en la partida)
    const data = JSON.stringify({
      usuario: `${usuario.id}`,
      campana: `${idCampa}`,
      pj: ''
    })

    try{
      // metiendo el usuario como jugador de la partida
      await event.locals.pb.collection('campana_jugadores').create(data)

      // buscando los datos del jugador recien metido en partida, para mostrar en la web...
      const jugador = await event.locals.pb.collection('v_datos_camapa_pj').getFirstListItem(`id_jugador = "${usuario.id}" && id_campa = "${idCampa}"`)
      return new Response(JSON.stringify({type: 'success', message: 'Jugador añadido', jugador}), {status:200})
    } catch (err){
      return new Response(JSON.stringify({type: 'error', message: 'No se pudo añadir al jugador'}), {status:200})
    }
  }
}

/**
 * Retirar jugador
 */
export const DELETE = async (event) =>{
  if(!event.locals.user) return new Response('No identificado')
  
  const data = await event.request.json()
  const {idJug} = data

  try{
    await event.locals.pb.collection('campana_jugadores').delete(idJug)
    return new Response(JSON.stringify({type: 'success', message: 'Borrado'}), {status: 200})
  }catch{
    return new Response(JSON.stringify({type: 'error', message: 'No se pudo retirar'}), {status: 200})
  }
}