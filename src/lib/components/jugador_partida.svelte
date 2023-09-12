<script>
  import { pjDragado, pjs, js } from '$lib/stores'
  export let jugador = undefined
  import { notifications } from '$lib/notifications'
  import { page } from '$app/stores'


  /**
   * @param id id de este JUGADOR que tiene asignado un personaje
   */
  function liberaPj(id){
    const datos = {id}
    const j = $js.get(id)
    const pj = $pjs.get(j.id_pj)

    // cambio optimista en la interfaz...
    const nombre_pjAnterior = jugador.nombre_pj
    const id_pjAnterior = jugador.id_pj
    const pjJugadorNombreAsignadoAnterior = pj.jugador_username
    const pjJugadorIdAsignadoAnterior = pj.id_jugador
    j.id_pj = ''
    j.nombre_pj = ''
    pj.id_jugador = ''
    pj.jugador_username = ''
    $pjs = $pjs
    $js = $js

    // enviar petición de liberación de pj
    fetch('/api/pj', {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', accion: 'liberarPj'},
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(res => {
      if (res?.type === 'success'){
        notifications.success(res.message)
      }else{
        //desacer cambio optimista
        j.id_pj = id_pjAnterior
        j.nombre_pj = nombre_pjAnterior
        pj.id_jugador = pjJugadorIdAsignadoAnterior
        pj.jugador_username = pjJugadorNombreAsignadoAnterior
        notifications.warning(res.message)
        $pjs = $pjs
        $js = $js
      }
    })
  }


  function retirarJ(id){
    const body = JSON.stringify({
      idJug: id,
    })

    fetch('/api/jug',{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then(res => res.json())
    .then(res => {
      if (res?.type === 'success'){
        notifications.success(res.message)
        // quitando los datos del jugador del personaje
        const suPj = $pjs.get($js.get(id).id_pj)
        if (suPj){
          suPj.id_jugador = ''
          suPj.jugador_username = ''
          $pjs = $pjs
        }
        
        // borrando el jugador
        $js.delete(id)
        $js = $js

      }else{
        notifications.warning(res.message)        
      }
    })
  }


  /**
   * 
   * @param id id del PERSONAJE que se le asigna a este j
   */
  function asignarPj(id){
    const pj = $pjs.get(id)
    const j = jugador

    $pjDragado = undefined

    // cambio optimista en la interfaz...
    const nombre_pjAnterior = j.nombre_pj
    const id_pjAnterior = j.id_pj
    const pjJugadorNombreAsignadoAnterior = pj.jugador_username
    const pjJugadorIdAsignadoAnterior = pj.id_jugador
    j.id_pj = pj.id
    j.nombre_pj = pj.nombre
    pj.id_jugador = jugador.id
    pj.jugador_username = jugador.jugador_username
    $pjs = $pjs
    $js = $js

    // construir datos para enviar al servidor
    const body = JSON.stringify({
      pjId: pj.id,
      jId: jugador.id
    })

    // enviar los datos de la asignación de personaje al servidor
    fetch('/api/pj',{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', accion: 'asignarPj'},
      body
    })
    .then(res => res.json())
    .then(res => {
      if (res.type === 'success'){
        notifications.success(res.message)
      }else{
        // deshacer el cambio optimista si no ha salido bien
        jugador.id_pj = id_pjAnterior
        jugador.nombre_pj = nombre_pjAnterior
        pj.id_jugador = pjJugadorIdAsignadoAnterior
        pj.jugador_username = pjJugadorNombreAsignadoAnterior
        notifications.warning(res?.message)
        $pjs = $pjs
        $js = $js
      }
    })
  }
  
</script>



<article>
    <div>
      <span>{jugador.jugador_username}</span>
      <button on:click={() => retirarJ(jugador.id)}>Retirar jugador</button>
    </div>
    {#if jugador.nombre_pj}
      <div>
        <a href="#">{jugador.nombre_pj}</a>
        <button on:click={() => {liberaPj(jugador.id)}}>Retirar Personaje</button>
      </div>
    {:else}
      <div
      class:objetivo={$pjDragado}
        on:drop={() => {asignarPj($pjDragado, jugador)}} 
        on:dragenter|preventDefault 
        on:dragover|preventDefault
      >
        <span>Sin personaje</span>
        <span>Arrastra aquí un personaje para asignar</span>
      </div>
    {/if}
</article>



<style>
  article{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 100%;
  }

  article > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    height: 100%;
  }

  .objetivo{
    outline: 1px dashed var(--borde);
    outline-offset: -1px;
  }
</style>