<script>
  import { conexion, desconexion, mandaSocket, mensajeDesdeServidor } from '$lib/socketmanager'
  import { ParticipantesLista} from '$lib/components'
  import { browser } from '$app/environment';
  import { page } from '$app/stores'
	import { onMount } from 'svelte';
  
  
  export let data
  let msg
  let recibido
  let usuario
  let listaParticipantes = []
  let idParticipante
  let pjEdit


  if (browser) console.log(data)
  
  $: recibido = $mensajeDesdeServidor && (data.js.get($mensajeDesdeServidor.de)?.nombre || '') + ': ' + $mensajeDesdeServidor.data + '\n'


  onMount(() => {
    listaParticipantes = crearListaGeneral()
  })

  
  //TODO debería conectar al entrar en esta página
  function conectar(){
    conexion(data.user.id, $page.params.k)
  }

  
  //TODO debería desconectar al salir de la página
  function desconectar(){
    console.log('deconectar')
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
          <textarea bind:value={recibido}></textarea>
        </article>
      </section>
    </div>

    <span>{pjEdit?.datos.nombre || ''}</span>
    <span>{pjEdit?.datos.Arma || ''}</span>

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