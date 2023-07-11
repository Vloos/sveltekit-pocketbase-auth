<script>
  import { closeModal } from 'svelte-modals';
  import { goto } from "$app/navigation";
  import { campDirigiendo } from '$lib/stores';
  import { notifications } from '$lib/notificaciones'
	

  let nombre = ''
  let desc = ''

  function keyPress(e){
    if (e.shiftKey && e.charCode === 13) {
      e.preventDefault()    
      crearPartida()
    }
  }


  function crearPartida(){
    
    if(nombre.length <= 3) {
      notifications.warning('Nobre demasiado corto', 3000)
      return
    }
    const body = JSON.stringify({
      nombre, desc
    })

    fetch('/api/partida',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then(res => res.json())
    .then(res => {
      if (res?.type === 'success'){
        notifications.success(res.message, 2000)
        $campDirigiendo.set(res.campa.id, res.campa)
        $campDirigiendo = $campDirigiendo
        closeModal()
        goto(`/dj/${res.campa.id}/administrar`)
      }else{
        notifications.warning(res.message, 2000)
      }
    })
  }
</script>



<header class="titulo">Crear nueva partida</header>
<article>
  <input 
    on:keypress={e => {keyPress(e)}}
    type="text" 
    name="nombre"
    id="nombre"
    placeholder="Nombre de la partida"
    autofocus
    bind:value={nombre}
  >
  <textarea
    on:keypress={e => {keyPress(e)}}
    name="desc" 
    id="desc" 
    placeholder="Descripción de la partida" 
    bind:value={desc}
  ></textarea>
  <button on:click={crearPartida} disabled={nombre.length <= 3}>Crear</button>
</article>



<style>
  article{
    width: 400px;
  }
  textarea{
    height: 300px;
  }
</style>

