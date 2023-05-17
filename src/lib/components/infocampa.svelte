<script>
	import { goto } from "$app/navigation";
  import {pjs, js} from '$lib/stores'
	import { notifications } from '$lib/notificaciones';
	import { formateaFecha } from '$lib/utils';
	
  export let campa
  let editando = false
  let nombreTemp = campa.nombre
  let descTemp = campa.descripcion

  
  function editar(){
    editando = true
    nombreTemp = campa.nombre
    descTemp = campa.descripcion
  }


  function cambiar(){
    const datos = {
      nombre: nombreTemp,
      descripcion: descTemp,
      id: campa.id
    }

    fetch('/api/partida',{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos),
    })
    .then(res => res.json())
    .then(res => {
      if(res?.type === 'success'){
        notifications.success(res.message, 3000)
        campa = res.campa
        editando = false
      }else{
        notifications.warning(res.message, 3000)
      }
    })
  }


  function borrar(){
    const datos = {
      id: campa.id,
    }
    
    const si = confirm('¿Seguro?')

    if (!si) return
    
    fetch('/api/partida',{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos),
    })
    .then(res => res.json())
    .then(res => {
      if (res?.type === 'success'){
        notifications.success(res.message, 3000)
        goto(`/`)
      } else {
        notifications.warning(res.message, 3000)
      }
    })
    
  }

</script>


<section>
  {#if editando}
  
    <input class="titulo" type="text" name="nombre" bind:value={nombreTemp}>
    <textarea name="descripcion" bind:value={descTemp} placeholder="Descripción"></textarea>
    <div class="botonera">
      <button type="reset" on:click|preventDefault={() => {editando = false}}>Cancelar</button>
      <button type="submit" on:click|preventDefault={() => {cambiar()}} disabled={!Boolean(nombreTemp)}>Cambiar</button>
    </div>

  {:else}
  
    <h2 class="titulo">{campa.nombre}</h2>
    {#if campa.descripcion}
      <p>{campa.descripcion}</p>
    {/if}
    <p>{formateaFecha(campa.created,'long', 'short')}</p>
    <div class="botonera">
      <button on:click={editar}>Editar</button>
      <button>Exportar</button>
      <button on:click={borrar}>Eliminar</button>
    </div>

  {/if}
</section>


<style>
  section{
    width: 800px;
  }

  input[type="text"]{
    text-align: center;
    background-color: var(--bg-int);
  }

  h2{
    padding: 8px
  }
</style>