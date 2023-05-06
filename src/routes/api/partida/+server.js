export const POST = async (event) => {
  if(!event.locals.user) return new Response('No identificado')

  let data = await event.request.json()
  const {nombre, desc} = data

  if (nombre.length < 3){
    return new Response(JSON.stringify({type: 'error',  message: 'Nombre vacío'}), {status: 200})
  }
    
  // crear datos para la partida
  const partida = JSON.stringify({
    nombre,
    descripcion: desc,
    dj: event.locals.user.id
  })

  // crear la partida con los datos (v_datos_campa)
  let res
  try{
    res = new Response(JSON.stringify({type: 'error', message: 'No se puede crear la partida'}), {status:200})
    const record = await event.locals.pb.collection('campana').create(partida);
    res = new Response(JSON.stringify({type: 'error', message: 'No se pueden recuperar los datos'}), {status:400})
    const campa = await event.locals.pb.collection('v_datos_campa').getFirstListItem(`id = "${record.id}"`)
    return new Response(JSON.stringify({type: 'success', message: 'Partida creada', campa}), {status: 200})
  } catch {
    return res
  }
}


export const PATCH = async (event) => {
  let data = await event.request.json()
  let id = data.id  
  if(!data.nombre) return new Response(JSON.stringify({type: 'error', message: 'Campaña sin nombre'}), {status:400})
  const datos = {
    nombre: data.nombre,
    descripcion: data.descripcion,
  };

  try{
    const record = await event.locals.pb.collection('campana').update(id, datos);
    return new Response(JSON.stringify({type: 'success', message: 'Datos cambiados', campa:record}), {status: 200})
  } catch (err){
    return new Response(JSON.stringify({type: 'error', message: err.message}), {status:400})
  }
}


export const DELETE = async (event) => {
  let data = await event.request.json()  
  try{
    await event.locals.pb.collection('campana').delete(data.id);
    return new Response(JSON.stringify({type: 'success', message: 'Campaña borrada'}), {status: 200})
  }catch (err){
    return new Response(JSON.stringify({type: 'error', message: 'No se pudo borrar la campaña'}), {status:400})
  }
}
