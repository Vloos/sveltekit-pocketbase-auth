<script>
	import { page } from "$app/stores";
  import { mandaSocket, chat } from '$lib/socketmanager'
	import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import { MensajeChat } from '$lib/components'
  

  let msg
  let contenedor
  let autoscroll


  onMount(() => {
    chat.reset()
  })


  function keyPress(e){
    if (e.shiftKey && e.charCode === 13) {
      e.preventDefault()
      if (msg.length > 0) manda()
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


  beforeUpdate(() => {
    autoscroll = contenedor && contenedor.offsetHeight + contenedor.scrollTop > contenedor.scrollHeight - 20;
  });
  
  afterUpdate(() => {
    if (autoscroll) contenedor.scrollTo(0, contenedor.scrollHeight);
  });
</script>



<section>
  <article class="mensajes" bind:this={contenedor}>
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
  </article>
</section>


<style>
  .mensajes{
    height: 100%;
    overflow: auto;
  }
  ul{
    height: 100%;
    overflow: auto;
  }

  section{
    height: 100%;
  }
</style>