<script>
  import { slide } from 'svelte/transition'

  export let listaParticipantes = []
  export let clickFn = undefined
  export let activo = ''

  function handleClick(cual){
    clickFn(cual)
    activo = cual
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


</style>