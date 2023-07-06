<script>
	import { page } from '$app/stores';
	
	import { goto } from '$app/navigation';
	import { UserAvatar, SModalAdmin, Notificacion} from '$lib/components'
  

  export let data
  import '../app.css'

</script>


<SModalAdmin/>
<Notificacion/>

<header id="cabezapaj">
  {#if data.user}
    <div class="usuario">
      <a class="identidad" href="/perfil">
        <span class="usrname">{data.user.username}</span>
      </a>
      <UserAvatar />
      <div class="botonera">
        <form action="/logout" method="POST">
          <button type="submit">Salir</button>
        </form>
        <button on:click={() => goto('/')}>Inicio</button>
      </div>
    </div>
  {/if}
  
  <h1>{$page?.data?.campa?.nombre || 'Cronista'}</h1>
  <hr>
</header>

<main>
  <slot/>
</main>


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