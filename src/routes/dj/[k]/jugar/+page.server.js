/** @type {import('./$types').PageLoad} */
import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils'

export async function load({params, locals}) {
  if (!locals.user) throw redirect(303, '/')
  

  // Comprobar la id del user. Comprobar la id del dueño de la partida. Si son distintos, no puede pasar
  let campa = await locals.pb.collection('campana').getOne(params.k)
  campa = serializeNonPOJOs(campa)
  if (campa.dj !== locals.user.id) throw redirect(303, '/' )

  
  // obtener datos de los personajes
  let pjsRecord = await locals.pb.collection('personajes_de_campana').getFullList({filter: `campana = "${params.k}"`})
  pjsRecord = serializeNonPOJOs(pjsRecord)
  let pjs = new Map()
  pjsRecord.map(pj => {pjs.set(pj.pj_id, {nombre: pj.pj_nombre, datos: pj.pj_datos, j: pj.j_id})})


  // obtener datos de los jugadores
  let jsRecord = await locals.pb.collection('jugadores_de_campana').getFullList({filter: `campana = "${params.k}"`})
  jsRecord = serializeNonPOJOs(jsRecord)
  let js = new Map()
  jsRecord.map(j => {js.set(j.j_id, {nombre: j.j_nombre, pj: j.pj_id})})
  

  return {user: locals.user, campa, pjs, js}
}