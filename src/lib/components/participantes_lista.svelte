<script>
  import { slide } from 'svelte/transition'
  import { amod } from '$lib/stores';

  export let listaParticipantes = []
  export let clickFn = undefined
  export let activo = ''

  function handleClick(cual){
    clickFn(cual)
    activo = cual
  }

  function privado(id){
    $amod('privado', {paraId: id})
  }
</script>

<section class="participantes">
  <ul>
    {#each listaParticipantes as p}
      <li >
        <button class="article" 
          transition:slide 
          on:click={() => {handleClick(p.idj || p.idp)}}
          class:activo={activo && (activo == p.idj || activo == p.idp)}
        >
          {p.nombrej} 
          {#if p.idp}
            <span class="etiqueta">
              {p.nombrep}
            </span>
          {/if}
        </button>
        {#if p.idj}
          <button
            on:click={() => {privado(p.idj)}}
          >
            Privado
          </button>
        {/if}
      </li>
    {/each}
  </ul>
</section>


<style>
  .activo{
    -webkit-box-shadow: inset 0px 0px 0px 2px var(--borde);
    -moz-box-shadow: inset 0px 0px 0px 2px var(--borde);
    box-shadow: inset 0px 0px 0px 2px var(--borde);
  }

  section{
    height: 100%;
  }
</style>