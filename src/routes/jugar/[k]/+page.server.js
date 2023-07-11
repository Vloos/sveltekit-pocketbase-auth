import { redirect } from '@sveltejs/kit'
import { serializeNonPOJOs } from '$lib/utils'

/** @type {import('./$types').PageLoad} */
export async function load({params, locals}) {
  if (!locals.user) throw redirect(303, '/')

  // comprobar que el jugador es de la partida
  let id = await locals.pb.collection('campana_jugadores').getFirstListItem(`usuario = "${locals.user.id}" && campana = "${params.k}"`)
  if (!id) throw redirect(303, '/')

  //envio de información de la partida.
  let campa = await locals.pb.collection('campana').getOne(params.k, {expand: 'dj'})
  campa = serializeNonPOJOs(campa)

  let participantes = await locals.pb.collection('jugadores_de_campana').getFullList({filter:`campana="${params.k}"`, fields:'j_id, j_nombre'})
  let js = new Map()
  participantes.map(p => js.set(p.j_id, {nombre: p.j_nombre}))
  
  return {user: locals.user, campa, js}
}