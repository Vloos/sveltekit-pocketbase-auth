<script>
  import { conexion, desconexion, mandaSocket, mensajeDesdeServidor } from '$lib/socketmanager'
  import { page } from '$app/stores'
  export let data
  let msg
  let recibido

  $: recibido = $mensajeDesdeServidor.data.msg


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
    const datos = msg
    mandaSocket('c:pj', datos, {idSala: $page.params.k})
  }
</script>


<main>
  <section>
    <header>Jugando</header>
    <div class="botonera">
      <button on:click={conectar}>Conectar</button>
      <button on:click={desconectar}>Desconectar</button>
    </div>
    <div class="botonera">
      <input type="text" name="msg" id="msg" bind:value={msg}>
      <button on:click={manda}>Manda</button>
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
