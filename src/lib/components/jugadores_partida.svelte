<script>
	import {JugadorPartida} from '$lib/components'
  import { js } from '$lib/stores'
  import { page } from '$app/stores'
	import { notifications } from '$lib/notifications';

  let email
  const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

  function insertaJ() {
    if (!emailRegExp.test(email)){
      notifications.warning('No se reconoce el email')
      return
    }

    let datos = {
      idCampa:$page.params.k,
      email
    }

    fetch('/api/jug', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(res => {
      if(res?.type === 'success'){
        notifications.success(res?.message)
        $js.set(res.jugador.id, res.jugador)
        $js = $js
        email = ''
      }else{
        notifications.warning(res?.message)
      }
    })
  }

  function keypress(e){
    if (e.keyCode === 13) insertaJ()
  }
</script>



<section class:nadie={$js.size === 0}>
  <header>Jugadores</header>
  <article class="botonera">
    <label for="email">Correo electrónico</label>
    <input on:keypress={e => {keypress(e)}} type="email" name="email" bind:value={email}>
    <button on:click={insertaJ} disabled={!emailRegExp.test(email)}>Añadir Jugador</button>
  </article>
  {#if $js.size > 0}
    <header class="titulo2"><span>Jugador</span><span>Personaje</span></header>
    <ul>
      {#each [...$js] as [k, jugador] (k)}
        <li><JugadorPartida {jugador}/></li>
      {/each}
    </ul>
  {:else}
      <li><article>Sin Jugadores</article></li>
  {/if}
</section>



<style>
  section{
    max-height: 50vh;
    min-height: 170px;
    width: 800px;
  }

  section.nadie{
    min-height:auto;
  }

  section > header{
    display: flex;
    justify-content: center
  }


  label{
    white-space: nowrap
  }
</style>
