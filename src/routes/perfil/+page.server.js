import { serializeNonPOJOs } from '$lib/utils';
import { redirect } from '@sveltejs/kit';


export const load = async ({params, locals}) =>{
  if (!locals.user) throw redirect(303, '/')
  let user = serializeNonPOJOs( await locals.pb.collection('users').getOne(locals.user.id))
  return user
}

