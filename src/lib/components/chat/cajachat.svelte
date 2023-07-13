<script>
	import { page } from "$app/stores";
  import { mandaSocket, chat } from '$lib/socketmanager'
	import { onMount } from "svelte";
  import { MensajeChat } from '$lib/components'
  

  let msg


  onMount(() => {
    chat.reset()
  })


  function keyPress(e){
    if (e.shiftKey && e.charCode === 13) {
      e.preventDefault()
      manda()
    }
  }


  function manda(){
    const datos = {msg}
    const cabecera = {
      idSala: $page.params.k,
      tipo: 'texo',
    }
    mandaSocket('c:chat', datos, cabecera)
    msg = ''
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
    <textarea
      on:keypress={keyPress}
      bind:value={msg}/>
    <button on:click={manda}>Manda</button>
  </article>
</section>


<style>
  ul{
    overflow: auto;
  }
</style>