<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { UserAvatar, Notificacion} from '$lib/components'
  

  export let data
  import '../app.css'

</script>



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
    grid-template-rows: 66px 2px;
    top: 0px;
    position: sticky;
    z-index: 999999;
    height: 72px;
  }

  main{
    height: calc(100vh - 72px);
    overflow: auto;
    padding-top: var(--padding-global);
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