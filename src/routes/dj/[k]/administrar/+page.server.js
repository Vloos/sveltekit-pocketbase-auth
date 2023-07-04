import { serializeNonPOJOs } from '$lib/utils';
import { redirect } from '@sveltejs/kit';


export const load = async ({params, locals}) =>{
  if (!locals.user) throw redirect(303, '/')

  let campa = await locals.pb.collection('campana').getOne(params.k);

  if (campa.dj !== locals.user.id){
    throw redirect(303, '/' )
  }

  campa = serializeNonPOJOs(campa)
  
  let jugadores = await locals.pb.collection('v_datos_camapa_pj').getFullList({
    filter: `id_campa = "${params.k}"`
  });

  jugadores = serializeNonPOJOs(jugadores)
  jugadores = new Map(jugadores.map(j => [j.id, j]))

  let personajes = await locals.pb.collection('v_datos_campa_j').getFullList({
    filter: `campana = "${params.k}"`,
  });

  personajes = serializeNonPOJOs(personajes)
  personajes = new Map(personajes.map(p => [p.id, p]))

  return {
    campa,
    jugadores,
    personajes,
  }
}

