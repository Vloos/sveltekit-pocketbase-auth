<script>
	import { amod } from '$lib/stores';
	import { page } from "$app/stores";
  import { mandaSocket, chat } from '$lib/socketmanager'
	import { onMount } from "svelte";
  import { Icons } from '$lib/components'
  

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


  function getNombre(id){
    return $page.data.js.get(id)?.nombre || $page.data.campa.expand?.dj.username || 'Desconocido'
  }


  function responder(id){
    $amod('privado', {paraId: id})
  }
</script>



<section>
  <article>
    <ul>
      {#each [...$chat] as [k, v] (k)}
        <li class="chat">
          <article>
            {getNombre(v.de)}
            {#if v.para}
              &rightarrow; {getNombre(v.para)}
            {/if}
            {#if v.de !== $page.data.user.id}
              <button on:click={() => {responder(v.de)}}>
                <Icons name="responder"/>
              </button>
            {/if}
            <hr>
            {v.msg}
          </article>
        </li>
      {/each}
    </ul>
  </article>

  <article class="mensaje">
    <textarea bind:value={msg}></textarea>
    <button on:click={manda}>Manda</button>
  </article>
</section>