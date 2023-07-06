<script>
  import { conexion, desconexion, mandaSocket, mensajeDesdeServidor } from '$lib/socketmanager'
  import { ParticipantesLista} from '$lib/components'
  import { page } from '$app/stores'
	import { onMount, onDestroy } from 'svelte';
  import {Ficha} from '$lib/pjcomponents.js'
  import Personaje from '$lib/pj/Personaje'
  
  
  export let data
  let msg
  let recibido
  let usuario
  let listaParticipantes = []
  let idParticipante
  let pjEdit

  $: recibido = $mensajeDesdeServidor && (data.js.get($mensajeDesdeServidor.j)?.nombre || '') + ': ' + $mensajeDesdeServidor.data + '\n'


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


  // msg durante las pruebas. Sustituirlo por los datos del personaje cuando eso
  function manda(){
    const datos = {msg}
    mandaSocket('c:pj', datos, {idSala: $page.params.k, para: idParticipante})
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
    idParticipante = cualo
    usuario = data.js.get(cualo)?.nombre
    pjEdit = data.pjs.get(idParticipante) || data.pjs.get(data.js.get(idParticipante).pj)
    pjEdit = pjEdit && Object.assign(new Personaje(), pjEdit.datos);
  }

</script>



<ParticipantesLista {listaParticipantes} clickFn={clickar}/>

<section class="fichas">
  <Ficha pj={pjEdit}/>
</section>

<section class="chat">
  <article>
    <header>Mensaje para {usuario || '...'}</header>
    <div class="botonera">
      <textarea bind:value={msg}></textarea>
      <button on:click={manda}>Manda</button>
    </div>
  </article>
  <article>
    <header>Respuesta</header>
    <textarea bind:value={recibido}></textarea>
  </article>
</section>




<style>
  .fichas{
    display: flex;
    flex-direction: column;
  }

  .chat{
    height: 100%;
  }
  .botonera button{
    height: 100%;
  }
</style>