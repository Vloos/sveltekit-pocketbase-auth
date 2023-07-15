<script>
	import { page } from '$app/stores';
	import { mandaSocket } from '$lib/socketmanager';
  import { closeModal } from 'svelte-modals';

  export let paraId = ''
  let paraNombre = getNombre(paraId)
  let msg = ''

  function manda(){
    const data = {msg}
    const cabecera = {
      idSala: $page.params.k,
      tipo: 'texo',
      para: paraId,
    }
    mandaSocket('c:chat', data, cabecera)
    closeModal()
  }


  function keyPress(e){
    if (e.shiftKey && e.charCode === 13) {
      e.preventDefault()
      manda()
    }
  }


  function getNombre(id){
    return $page.data.js.get(id)?.nombre || $page.data.campa.expand?.dj.username || 'Desconocido'
  }
</script>



<article>
  <header>
    Mensaje para {paraNombre}
  </header>
  <textarea
    on:keypress={e => {keyPress(e)}}
    bind:value={msg}
    name="msg"
    id="msgtexto"
  ></textarea>
  <button 
    on:click={manda}
    disabled={msg.length === 0}
  >Enviar a {paraNombre}</button>
</article>