<script>
	import { page } from "$app/stores";
  import { mandaSocket, chat } from '$lib/socketmanager'
	import { onMount } from "svelte";

  let msg
  
  $: console.log('page', $page.data)


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

</script>



<section>
  <article>
    <ul>
      {#each [...$chat] as [k, v] (k)}
        <li class="chat">
          <article>
            {getNombre(v.de)}
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