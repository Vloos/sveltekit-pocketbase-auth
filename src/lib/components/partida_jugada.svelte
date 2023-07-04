<script>
	import { goto } from "$app/navigation";
	export let partida = undefined
</script>



{#if !partida}
<header class='titulo2'>
  <span>Nombre</span>
  <span>Director</span>
  <span>Personaje</span>
</header>
{:else}
  <article>
    <span>{partida.nombre_campa}</span>
    <span>{partida.name_dj}</span>
    <span>{partida.nombre_pj}</span>
    {#if partida.jugando}
      <button on:click={goto(`/jugar/${partida.id_campa}`)}>Jugar</button>
    {/if}
  </article>
{/if}



<style>
  header, article{
    display: grid;
    grid-template-columns: 14rem auto 8rem;
  }
</style>