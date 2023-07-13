<script>
	import { page } from "$app/stores";
  import { mandaSocket, chat } from '$lib/socketmanager'
	import { onMount } from "svelte";
  import { MensajeChat } from '$lib/components'
  

  let msg


  onMount(() => {
    chat.reset()
  })


  function manda(){
    const datos = {msg}
    const cabecera = {
      idSala: $page.params.k,
      tipo: 'texo',
    }
    mandaSocket('c:chat', datos, cabecera)
  }
</script>



<section>
  <article>
    <ul>
      {#each [...$chat] as [k, v] (k)}
        <li class="chat">
          <MensajeChat chatMsg={v}/>
        </li>
      {/each}
    </ul>
  </article>

  <article class="mensaje">
    <textarea bind:value={msg}></textarea>
    <button on:click={manda}>Manda</button>
  </article>
</section>


<style>
  ul{
    overflow: auto;
  }
</style>