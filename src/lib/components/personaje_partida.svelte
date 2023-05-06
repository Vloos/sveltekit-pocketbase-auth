<script>
  export let pj = undefined;
</script>


<div>
  {#if !pj}
    <span>Nombre</span><span>Jugador asignado</span>
  {:else}
    <a href="#" draggable="false">{pj.nombre}</a>
    <span>{pj.jugador_username || 'No asignado'}</span>
  {/if}
</div>


<style>
  div{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
</style>