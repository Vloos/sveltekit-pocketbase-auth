<script>
  /** @type {Object.<string, {c:ConstructorOfATypedSvelteComponent, p:Object.<string, any>}>}  */
  export let items = {};
  /** @type {string} */
  export let activo = Object.entries(items)[0][0];
  console.log('activo',activo);
</script>

<div>
  <ul>
    {#each Object.entries(items) as [item] }
      <li class="tab" class:activo={activo === item}>
        <button on:click={() => {activo = item}}>{item}</button>
      </li>
      {/each}
    </ul>
  <article>
      <svelte:component this={items[activo].c} {...items[activo].p}/>
  </article>
</div>


<style>
  div {
    backdrop-filter: blur(10px);
    width: 800px;
  }

  ul {
    display: flex;
    flex-direction: row;
    gap: 0;
    background-color: transparent;
  }

  button{
    border: none;
    cursor: pointer;
    background-color: var(--bg-main);
  }
  
  li.activo button {
    background-color: var(--bg-2);
    cursor:auto;
    font-weight: bold;
  }
</style>