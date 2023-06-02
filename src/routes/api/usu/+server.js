export const PATCH = async event => {
  if(!event.locals.user) return new Response('No identificado')

  const data = await event.request.json()
  let record
  try{
    switch(event.request.headers.get('accion')){
      case 'mailVis':   // cambiar la visivilidad del email del usuario
        record = await event.locals.pb.collection('users').update(event.locals.user.id, JSON.stringify(data));
        return new Response(JSON.stringify({type: 'success', message: 'Visivilidad cambiada.', value: record.emailVisibility}), {status: 200})        
      case 'uName':  // cambiar el nombre de usuario del usuario
        record = await event.locals.pb.collection('users').update(event.locals.user.id, JSON.stringify(data));
        return new Response(JSON.stringify({type: 'success', message: 'Nombre de usuario cambiado', value: record.username}), {status:200})
      case 'email':   // solicitar cambio de email del usuario
        await event.locals.pb.collection('users').requestEmailChange(data.email);
        return new Response(JSON.stringify({type: 'success', message: 'Email cambiado.'}), {status: 200})
      case 'avatar':  // solicitar el cambio del avatar del usuario
        break
      case 'pass':  // cambio de contraseña del usuario
        record = await event.locals.pb.collection('users').update(event.locals.user.id, JSON.stringify(data));
        return new Response(JSON.stringify({type: 'success', message: 'Contraseña cambiada.'}), {status: 200})
      
    }
  } catch (err) {
    return new Response(JSON.stringify({type: 'error', message: 'Hubo un error con la solicitud'}), {status: 400})
  }
}