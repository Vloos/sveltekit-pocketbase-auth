<script>
  import { conexion, desconexion, mandaSocket, mensajeDesdeServidor } from '$lib/socketmanager'
  import { page } from '$app/stores'
	import { onMount, onDestroy } from 'svelte';
  export let data
  let msg
  let recibido

  $: recibido = $mensajeDesdeServidor && $mensajeDesdeServidor.data.msg

  onMount(() => {
    conectar()
  })

  onDestroy(() => {
    desconectar()
  })

  
  function conectar(){
    conexion(data.user.id, $page.params.k)
  }


  function desconectar(){
    desconexion()
  }

  
  function manda(){
    const datos = msg
    mandaSocket('c:pj', datos, {idSala: $page.params.k})
  }
</script>


<main>
  <section>
    <header>Jugando</header>
    <div class="botonera">
      <input type="text" name="msg" id="msg" bind:value={msg}>
      <button on:click={manda}>Envia a Dj ({data.campa.expand.dj.username})</button>
    </div>
  </section>

  <div class="central">
      <section class="privi">
        <article>
          <header>Respuesta</header>
          <textarea bind:value={recibido}></textarea>
        </article>
      </section>
    </div>
</main>
