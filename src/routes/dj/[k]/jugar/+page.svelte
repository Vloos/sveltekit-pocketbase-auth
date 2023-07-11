<script>
  import { conexion, desconexion, mandaSocket, chat } from '$lib/socketmanager'
  import { ParticipantesLista, Chat} from '$lib/components'
  import { page } from '$app/stores'
	import { onMount, onDestroy } from 'svelte';
  import {Ficha} from '$lib/pjcomponents.js'
  import Personaje from '$lib/pj/Personaje'
  
  
  export let data
  let recibido
  let usuario
  let listaParticipantes = []
  let idParticipante
  let pjEdit

  //$: recibido = $chat && (data.js.get($chat.j)?.nombre || '') + ': ' + $chat.data + '\n'


  // comenzar sesión cuando se carga el componente
  onMount(() => {
    listaParticipantes = crearListaGeneral()
    conectar()
  })

  // terminar sesión cuando el componente se destrulle
  onDestroy(() => {
    desconectar()
  })

  
  function conectar(){
    conexion(data.user.id, $page.params.k)
  }

  
  function desconectar(){
    desconexion()
  }


/**
 * Crea una sola lista que combina los mapas de jugadores y personajes
 */
  function crearListaGeneral(){
    let lista = []
    data.js.forEach((j, k) => {
      const p = data.pjs.get(j.pj)
      const listElemento = {nombrej: j.nombre, idj: k, nombrep: p?.nombre || '', idp: j.pj || '' }
      lista.push(listElemento)
    });
    data.pjs.forEach((p, k) => {
      if (!p.j){
        const listElemento = {nombrej: '', idj: '', nombrep: p.nombre , idp: k,}
        lista.push(listElemento)
      }
    })
    return lista
  }


  function clickar(cualo){
    if (!cualo){
      usuario = undefined
      pjEdit = undefined
      return
    }
    idParticipante = cualo
    usuario = data.js.get(cualo)?.nombre
    pjEdit = data.pjs.get(idParticipante) || data.pjs.get(data.js.get(idParticipante).pj)
    pjEdit = pjEdit && Object.assign(new Personaje(), pjEdit.datos);
  }

</script>


<div class="sesion">
  <ParticipantesLista {listaParticipantes} clickFn={clickar}/>
  <Ficha pj={pjEdit}/>
  <Chat/>
</div>



<style>
  .sesion{
    display: flex;
  }
</style>