<script>
  import { conexion, desconexion, mandaSocket, mensajeDesdeServidor } from '$lib/socketmanager'
  import { ParticipantesLista} from '$lib/components'
  import { browser } from '$app/environment';
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



<main>

  <section class="titulocampa">
    <h2>{data.campa.nombre}</h2>
  </section>

  <div class="central">
    {#if data.pjs.size > 0}
      <ParticipantesLista {listaParticipantes} clickFn={clickar}/>
    {/if}
      <section class="privi">
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

    </div>
    <Ficha pj={pjEdit}/>
</main>



<style>
  div.central{
    display: grid;
    grid-template-columns: max-content auto;
    width: 800px;
  }

  .botonera button{
    height: 100%;
  }
</style>