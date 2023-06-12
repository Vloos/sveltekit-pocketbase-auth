<script>
	import { goto } from '$app/navigation';
	import { UserAvatar, SModalAdmin, Notificacion} from '$lib/components'
  export let data
  import '../app.css'
</script>


<SModalAdmin/>
<Notificacion/>
<div id="bgcabeza">
  <header id="cabezapaj">
      {#if data.user}
        <div class="usuario">
          <a class="identidad" href="/perfil">
            <span class="usrname">{data.user.username}</span>
          </a>
          <UserAvatar nombre = {data.user.username}/>
          <div class="botonera">
            <form action="/logout" method="POST">
              <button type="submit">Salir</button>
            </form>
            <button on:click={() => goto('/')}>Inicio</button>
          </div>
        </div>
      {/if}
      <h1>Cronista del Plano</h1>
  </header>
</div>
<hr>

<slot/>


<style>

  #cabezapaj{
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: 4px;
  }

  .usuario{
    display: grid;
    grid-template-columns: repeat(3, auto);
    width: min-content;
    place-self: start;
    margin: 0;
  }



</style>