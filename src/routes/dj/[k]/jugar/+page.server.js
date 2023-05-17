/** @type {import('./$types').PageLoad} */
import { redirect } from '@sveltejs/kit';

export async function load({params, locals}) {
  if (!locals.user) return { user: undefined }
  // Comprobar la id del user. Comprobar la id del dueño de la partida. Si son distintos, no puede pasar
  let campa = await locals.pb.collection('campana').getOne(params.k)

  if (campa.dj !== locals.user.id){
    throw redirect(300, '/' )
  }
  
  return {user: locals.user}
}