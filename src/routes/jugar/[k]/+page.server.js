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
  return {user: locals.user, campa}
}