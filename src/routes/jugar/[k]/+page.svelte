<script>
  import { conexion, desconexion, mandaSocket, chat } from '$lib/socketmanager'
  import { Chat } from '$lib/components'
  import { page } from '$app/stores'
	import { onMount, onDestroy } from 'svelte';
  export let data
  let msg


  onMount(() => {
    chat.reset()
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
    mandaSocket('c:pj', datos, {idSala: $page.params.k, para: data.campa.dj})
  }
</script>



<section>
  <header>Jugando</header>
  <div class="botonera">
    <input type="text" name="msg" id="msg" bind:value={msg}>
    <button on:click={manda}>Envia a Dj ({data.campa.expand.dj.username})</button>
  </div>
</section>

<Chat/>


