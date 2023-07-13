<script>
	import { Icons } from '$lib/components';
	import { amod } from '$lib/stores';
  import { page } from "$app/stores";

  export let chatMsg = undefined

  
  function responder(id){
    $amod('privado', {paraId: id})
  }


  function getNombre(id){
    return $page.data.js.get(id)?.nombre || $page.data.campa.expand?.dj.username || 'Desconocido'
  }
</script>


<article>
  <div>
    {getNombre(chatMsg.de)}
    {#if chatMsg.para}
      &rightarrow; {getNombre(chatMsg.para)}
    {/if}
    {#if chatMsg.de !== $page.data.user.id}
      <button on:click={() => {responder(chatMsg.de)}}>
        <Icons name="responder"/>
      </button>
    {/if}
  </div>
  <hr>
  {chatMsg.msg}
</article>


<style>
  article{
    justify-items: start;
  }
  div{
    display: grid;
    grid-template-columns: auto max-content;
    font-size: 0.80rem;
    justify-items: end;
  }

  hr{
    height:1px;
    border: none;
    border-bottom: 1px solid var(--borde);
  }

  button{
    height: 20px;
    aspect-ratio: 1;
    padding: 0px;
  }
</style>