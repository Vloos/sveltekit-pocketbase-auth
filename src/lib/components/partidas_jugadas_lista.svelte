<script>
  import { PartidaJugada } from "$lib/components";
  import { campJugando } from '$lib/stores';
</script>



<section>
  <header>Partidas jugadas</header>
  <PartidaJugada/>
  <ul>
    {#each [...$campJugando] as [k, partida] (k)}
      <li><PartidaJugada {partida}/></li>
    {:else}
      <li><article>Sin partidas</article></li>
    {/each}
  </ul>
</section>



<style>
  section{
    width: 800px;
    max-height: 50vh;
    min-width: 170px;
  }
  
</style>
