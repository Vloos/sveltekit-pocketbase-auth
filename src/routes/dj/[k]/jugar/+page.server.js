/** @type {import('./$types').PageLoad} */
import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils'

export async function load({params, locals}) {
  if (!locals.user) throw redirect(303, '/')
  
  // Comprobar la id del user. Comprobar la id del dueño de la partida. Si son distintos, no puede pasar
  let campa = await locals.pb.collection('campana').getOne(params.k)
  campa = serializeNonPOJOs(campa)
  if (campa.dj !== locals.user.id) throw redirect(303, '/' )
  
  return {user: locals.user, campa}
}