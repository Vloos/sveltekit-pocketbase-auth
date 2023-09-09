<script>
	import { Icons } from '$lib/components';
  // import Numero from './Numero.svelte';
  export let pj = {
    altura: 1,
    edad: 16,
    peso: 40
  }
  export let editando = false
</script>



<div class="{editando ? 'editando' : 'contenedor'}">
  {#if editando}

    <div class="edit contenedor2">
      <span>Altura (1 - 2.30 metros):</span>
      <input type="number" min="1" max="2.30" step="0.01">
      <!-- <Numero min={1} max={2.30} step={0.01} bind:value={pj.altura} uNoVisible dNoVisible/> -->
      <span class="icon" title="Altura">
        <Icons name={'altura'}/>
      </span>
    </div>

    <div class="edit contenedor2">
      <span>Edad (16 - 113 años):</span>
      <input type="number" min="16" max="113" bind:value={pj.edad}>
      <!-- <Numero min={16} max={113} bind:value={pj.edad} uNoVisible dNoVisible/> -->
      <span class="icon" title="Edad">
        <Icons name={'edad'}/>
      </span>
    </div>

    <div class="edit contenedor2">
      <span>Peso (40 - 240 kilogramos):</span>
      <input type="number" min="40" max="240" bind:value={pj.peso}>
      <!-- <Numero min={40} max={240} bind:value={pj.peso} uNoVisible dNoVisible/> -->
      <span class="icon" title="Peso">
        <Icons name={'peso'}/>
      </span>
    </div>

  {:else}

    <div class="dato contenedor2">
      <span class="icon" title="Altura">
        <Icons name={'altura'}/>
      </span>
      <span>{pj.altura} m</span>
    </div>

    <div class="dato contenedor2">
      <span class="icon" title="Edad">
        <Icons name={'edad'}/>
      </span>
      <span>{pj.edad} años</span>
    </div>

    <div class="dato contenedor2">
      <span class="icon" title="Peso">
        <Icons name={'peso'}/>
      </span>
      <span>{pj.peso} kg</span>
    </div>
  
    {/if}
</div>



<style>
  .contenedor{
    grid-template-columns: repeat(3, auto);
  }

  .edit{
    grid-template-columns: max-content 40px 28px;
  }
  
  .editando{
    padding: 0;
    display: grid;
    background-color: transparent;
    grid-template-columns: repeat(3, max-content);
  }

  .dato{
    grid-template-columns: 28px auto;
  }

  
</style>