<script>
  import { conexion, desconexion, mandaSocket } from '$lib/socketmanager'
  import { page } from '$app/stores'
  export let data
  let msg

  function conectar(){
    conexion(data.user.id, $page.params.k)
  }

  function desconectar(){
    console.log('deconectar')
    desconexion()
  }

  function manda(){
    const data = {msg}
    console.log('manda')
    mandaSocket('c:manda', data)
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
</main>
