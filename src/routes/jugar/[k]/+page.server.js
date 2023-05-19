import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({params, locals}) {
  if (!locals.user) throw redirect(300, '/')

  // comprobar que el jugador es de la partida
  let id = await locals.pb.collection('campana_jugadores').getFirstListItem(`usuario = "${locals.user.id}" && campana = "${params.k}"`)
  if (!id) throw redirect(300, '/')

  // comprobar que la partida se está jugando

}