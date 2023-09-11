<script>
	import { Icons } from '$lib/components';
  export let pj = {
    altura: 1,
    edad: 16,
    peso: 40
  }

</script>



<article>
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
</article>



<style>
  .edit{
    grid-template-columns: max-content 40px 28px;
  }
  
  article{
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, max-content);
  }
</style>