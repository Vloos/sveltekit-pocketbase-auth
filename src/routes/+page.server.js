import { serializeNonPOJOs } from '$lib/utils';
import {error, redirect, fail} from '@sveltejs/kit'


export const load = async ({ locals }) =>{
  //console.log('Page Load')


  if (locals.user){
    let dirigiendo = new Map()
    let jugando = new Map()

    try{
      dirigiendo = serializeNonPOJOs(await locals.pb.collection('v_datos_campa').getFullList({
        sort: '-creado',
        filter: `dj = "${locals.user.id}"`
      }));
      // convertir la lista de partidas dirigidas en un map
      dirigiendo = new Map(dirigiendo.map(d => [d.id, d]))
    }catch (err){
      return {error: true}
    }

    try{
      jugando = serializeNonPOJOs(await locals.pb.collection('v_datos_camapa_pj').getFullList({
        filter: `id_jugador = "${locals.user.id}"`
      }))
      // convertir la lista de partidas jugadas en un map
      jugando = new Map(jugando.map(j => [j.id, j]))
    }catch (err){
      return {error: true}
    }

    return {
      user: locals.user,
      dirigiendo,
      jugando,
    }
  }

  return {
    user: undefined
  }
}



export const actions = {
  login: async ({request, locals}) => {
    const body = Object.fromEntries(await request.formData())

    try{
      await locals.pb.collection('users').authWithPassword(body.username, body.password)
      // Comprobar la verificación del usuario
      //console.log('Usuario verificado: ', locals.pb?.authStore?.model?.verified);
      if (!locals.pb?.authStore?.model?.verified){
        // Si no está verificado, se vacía la autorización.
        //locals.pb.authStore.clear() 
        //return {
        //  notVerified: true
        //}
        
        // Pero se verifica la primera vez que se identifica
        await locals.pb.collection('users').update(locals.pb.authStore.model.id, {"verified":true});
      }
    }catch (err){
      if (err.status === 400) throw error(500, 'Fallo de identificación')
      throw error(500, 'No hay acceso a los datos')
    }

    throw redirect(303, '/')
  },

  register: async ({locals, request}) => {
    const body = Object.fromEntries(await request.formData())

    try{
      await locals.pb.collection('users').create({...body, verified: 1})
      // esperar a la verificación con email
      //await locals.pb.collection('users').requestVerification(body.email)
    } catch (err){
      // si el registro falla, se devuelv un "fail", con el estatus y un objeto que contiene los campos del formulario, para recuperarlos en la página y rellenar el formulario automáticamente
      return fail(400, {error: true, message: err.response, fields: body})
    }
    return{
      success: true
    }

  }
}



