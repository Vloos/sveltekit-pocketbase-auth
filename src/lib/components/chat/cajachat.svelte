<script>
	import { page } from "$app/stores";
  import { mandaSocket, chat } from '$lib/socketmanager'

  let msg
  export let para
  
  $: console.log($chat)
  $: console.log('page', $page)

  function manda(){
    const datos = {msg}
    const cabecera = {
      idSala: $page.params.k,
      para: para?.idParticipante,
      tipo: 'texo'
    }
    mandaSocket('c:chat', datos, cabecera)
  }

</script>


<section>
  <ul>
    {#each [...$chat] as [k, v] (k)}
      <li class="chat">
        <article>
          <header>
            Alguien &rightarrow; Alguien
          </header>
          {v.msg}
        </article>
      </li>
    {/each}
  </ul>

  <article class="mensaje">
    <header>Mensaje para {para?.usuario || '...'}</header>
    <div class="botonera">
      <textarea bind:value={msg}></textarea>
      <button on:click={manda}>Manda</button>
    </div>
  </article>
</section>

<style>
</style>