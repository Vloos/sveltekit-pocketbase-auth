import { serializeNonPOJOs } from '$lib/utils';
import {error, redirect, fail} from '@sveltejs/kit'
import PocketBase from 'pocketbase';


export const load = async ({ locals }) =>{
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
    }catch (err){
      if (err.status === 400) throw error(500, 'Fallo de identificación')
      throw error(500, 'No hay acceso a los datos')
    }

    throw redirect(303, '/')
  },

  register: async ({locals, request}) => {
    const body = Object.fromEntries(await request.formData())

    try{
      const usr = await locals.pb.collection('users').create(body)

      // esperar a la verificación con email
      //await locals.pb.collection('users').requestVerification(body.email)

      // validar el usuario sin usar email
      const pb = new PocketBase('http://127.0.0.1:8090')
      await pb.admins.authWithPassword('test@test.test', '1234567890');
      await pb.collection('users').update(usr.id, {"verified": true});
      pb.authStore.clear();

    } catch (err){
      // si el registro falla, se devuelv un "fail", con el estatus y un objeto que contiene los campos del formulario, para recuperarlos en la página y rellenar el formulario automáticamente
      return fail(400, {error: true, message: err.response, fields: body})
    }
    return{
      success: true
    }

  }
}



