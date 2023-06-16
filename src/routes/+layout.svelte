<script>
	import { getImageURL } from '$lib/utils.js';
	import { goto } from '$app/navigation';
	import { UserAvatar, SModalAdmin, Notificacion} from '$lib/components'

  export let data
  import '../app.css'

  let file = data.user?.avatar
  let coleccion = data.user?.collectionId
  let record = data.user?.id
  let size = '50x50'

  let url = Boolean(file) && getImageURL(coleccion, record, file, size)

</script>


<SModalAdmin/>
<Notificacion/>

<header id="cabezapaj">
  {#if data.user}
    <div class="usuario">
      <a class="identidad" href="/perfil">
        <span class="usrname">{data.user.username}</span>
      </a>
      <UserAvatar nombre = {data.user.username} {url}/>
      <div class="botonera">
        <form action="/logout" method="POST">
          <button type="submit">Salir</button>
        </form>
        <button on:click={() => goto('/')}>Inicio</button>
      </div>
    </div>
  {/if}
  <h1>Cronista</h1>
  <hr>
</header>


<slot/>


<style>

  #cabezapaj{
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    top: 0px;
    position: sticky;
    z-index: 999999;
  }

  .usuario{
    display: grid;
    grid-template-columns: repeat(3, auto);
    width: min-content;
    place-self: start;
    margin: 4px;
    padding: 4px;
  }

  hr{
    grid-row: 2;
    grid-column: 1/4;
  }


</style>