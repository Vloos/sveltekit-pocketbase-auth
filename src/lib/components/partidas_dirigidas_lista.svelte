<script>
  import { PartidaDirigida, Modal, CrearPartidaModal } from "$lib/components";
  import { amod } from '$lib/stores'
  import { campDirigiendo } from '$lib/stores';
  
	
  let modal

  function crearPartida(){
    // $amod('crearPartida')
    modal.abrir({c:CrearPartidaModal})
  }
</script>

<Modal bind:this={modal}/>
<section>
  <header>Partidas dirigidas</header>
  <div class="botonera"><button on:click={crearPartida}>Crear una partida</button></div>
  {#if $campDirigiendo.size > 0}
    <PartidaDirigida/>
  {/if}
  <ul>
    {#each [...$campDirigiendo] as [k, partida] (k)}
      <li><PartidaDirigida {partida}/></li>
    {:else}
      <li><article>Sin partidas</article></li>
    {/each}
  </ul>
</section>

<style>
  section{
    max-height: 50vh;
    width: 800px;
  }
</style>

