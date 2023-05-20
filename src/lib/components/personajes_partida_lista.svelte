<script>
	import { pjs, pjDragado, js } from '$lib/stores'
  import { PersonajePartida, BotonBorrar } from '$lib/components'
  import { page } from '$app/stores'
	import { notifications } from '$lib/notificaciones';

  let nombre = ''

  function creaPj(){
    if (nombre < 3) {
      notifications.warning('Nombre demasiado corto', 3000)
    }

    const body = JSON.stringify({
      nombre: nombre,
      campana: $page.params.k
    })

    fetch('/api/pj',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body
    })
    .then(res => res.json())
    .then(res => {
      if (res?.type === 'success') {
        console.log(res.pj)
        $pjs.set(res.pj.id, res.pj)
        $pjs = $pjs
        notifications.success(res?.message, 3000)
        nombre = ''
      } else {
        notifications.warning(res?.message, 3000)
      }
    })
  }


  function borrarPj(id){
    const body = JSON.stringify({id})

    fetch('/api/pj',{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body
    })
    .then(res => res.json())
    .then(res => {
      if (res?.type === 'success'){
        notifications.success(res?.message, 3000)
        const jugador = $js.get(res.idJug)       
        if(jugador){
          jugador.nombre_pj = ''
          jugador.id_pj = ''
          $js = $js
        }
        $pjs.delete(id)
        $pjs = $pjs
      } else {
        notifications.warning(res?.message, 3000)
      }
    })
  }


  function nuevoPjBoton(e){
    if (e.keyCode === 13){
      creaPj()
    }
  }

</script>



<section class:nadie={$pjs.size === 0}>
  <header>Personajes</header>
  <article class="botonera">
    <label for="nombrepj">Nombre</label>
    <input
      on:keypress={e => {nuevoPjBoton(e)}}
      type="text"
      name="nombrepj" 
      id="nombrepj"
      bind:value={nombre}
    >
    <button 
      on:click={() => {creaPj()}} 
      disabled={nombre.length < 3}
    >Crear personaje</button>
  </article>
  {#if $pjs.size > 0}
    <header><PersonajePartida/></header>
  {/if}
  <ul>
    {#each [...$pjs] as [k, pj] (k)}
      <li 
        class="contenedor2" 
        draggable={!pj.id_jugador} 
        on:dragstart={() => {$pjDragado = k}}
        on:dragend={() => {$pjDragado = undefined}}
        >
        <PersonajePartida {pj}/>
        <BotonBorrar on:borrar={() => borrarPj(k)}/>
      </li>
    {:else}
      <li><article>Sin Personajes</article></li>
    {/each}
  </ul>
</section>



<style>
  li{
    grid-template-columns: auto min-content;
  }

  section{
    width: 800px;
    max-height: 50vh;
  }

  label{
    flex-basis: max-content;
    padding: 4px;
  }
</style>
