<script context="module">
  export function updateTextos(loque){
    console.log('updatando');
    textos.set(loque)
  }
  export let textos = writable()
  
</script>



<script>
  import { conexion, desconexion, mandaSocket } from '$lib/socketmanager'
  import { ParticipantesLista} from '$lib/components'
  import { browser } from '$app/environment';
  import { page } from '$app/stores'
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
  
  export let data
  let msg
  let caja
  let recivido
  let mensaje
  let usuario
  let listaParticipantes = []
  let activo = ''

  if (browser) console.log(data)
  
  $: recivido = $textos && (data.js.get($textos.j)?.nombre || '') + ': ' + $textos.msg + '\n'

  onMount(() => {
    listaParticipantes = crearListaGeneral()
  })

  //TODO clickando en un nombre de personaje / usuario

  
  //TODO debería conectar al entrar en esta página
  function conectar(){
    conexion(data.user.id, $page.params.k)
  }

  //TODO debería desconectar al salir de la página
  function desconectar(){
    console.log('deconectar')
    desconexion()
  }

  function manda(){
    const datos = {msg}
    console.log('manda')
    mandaSocket('c:pj', datos, {idSala: $page.params.k})
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
    console.log('clickado: ' + cualo);
  }

</script>



<main>
  <section>
    <header>Jugando</header>
    <div class="botonera">
      <button on:click={conectar}>Conectar</button>
      <button on:click={desconectar}>Desconectar</button>
    </div>
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
          <textarea bind:value={recivido}></textarea>
        </article>
      </section>
    </div>


</main>



<style>
  div.central{
    display: grid;
    grid-template-columns: max-content auto;
  }

  .botonera button{
    height: 100%;
  }
</style>