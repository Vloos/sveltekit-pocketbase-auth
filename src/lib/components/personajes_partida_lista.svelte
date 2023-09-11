<script>
	import { pjs, js } from '$lib/stores'
  import { PersonajePartida, BotonBorrar, Modal, NuevoPjModal } from '$lib/components'
	import { notifications } from '$lib/notifications'
  

  let nombre = ''
  let modal


  /*
  function creaPj(){
    if (nombre < 3) {
      notifications.warning('Nombre demasiado corto', 3000)
    }

    const body = JSON.stringify({
      nombre: nombre,
      campana: $page.params.k,
    })

    fetch('/api/pj',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body
    })
    .then(res => res.json())
    .then(res => {
      if (res?.type === 'success') {
        $pjs.set(res.pj.id, res.pj)
        $pjs = $pjs
        notifications.success(res?.message)
        nombre = ''
      } else {
        notifications.warning(res?.message)
      }
    })
  }
*/

  function modalNuevoPj(){
    modal.abrir({c:NuevoPjModal})
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
        notifications.success(res?.message)
        const jugador = $js.get(res.idJug)       
        if(jugador){
          jugador.nombre_pj = ''
          jugador.id_pj = ''
          $js = $js
        }
        $pjs.delete(id)
        $pjs = $pjs
      } else {
        notifications.warning(res?.message)
      }
    })
  }


  function nuevoPjBoton(e){
    if (e.keyCode === 13){
      creaPj()
    }
  }

</script>


<Modal bind:this={modal}/>
<section class:nadie={$pjs.size === 0}>
  <header>Personajes</header>
  <article class="botonera">
    <button 
      on:click={() => {modalNuevoPj()}} 
    >Crear personaje</button>
  </article>
  {#if $pjs.size > 0}
    <PersonajePartida/>
    <ul>
      {#each [...$pjs] as [k, pj] (k)}
        <li>
          <article class="pj">
            <PersonajePartida {pj}/>
            <BotonBorrar on:borrar={() => borrarPj(k)}/>
          </article>
        </li>
      {/each}
    </ul>
  {:else}
      <article>Sin Personajes</article>
  {/if}
  
</section>



<style>
  section{
    width: 800px;
    max-height: 50vh;
  }

  .pj{
    display: grid;
    grid-template-columns: auto min-content;
  }
</style>
