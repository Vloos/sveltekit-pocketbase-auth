<script>
  import { pjDragado } from '$lib/stores'
  export let pj = undefined;
</script>


{#if !pj}
  <header class="titulo2"><span>Nombre</span><span>Jugador asignado</span></header>
{:else}
  <div>
      <a
        draggable={!pj.id_jugador} 
        on:dragstart={() => {$pjDragado = pj.id}}
        on:dragend={() => {$pjDragado = undefined}} 
        href="#"
      >{pj.nombre}</a>
      <span>{pj.jugador_username || 'No asignado'}</span>
  </div>
{/if}


<style>
  div, header{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
</style>