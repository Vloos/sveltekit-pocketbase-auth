<script>
	import { goto } from "$app/navigation";
  import {formateaFecha} from "$lib/utils"

	export let partida = undefined

  function handleClick(id){
    goto(`/dj/administrar/${id}`)
  }
</script>

{#if !partida}
  <header>
    <span>Nombre</span>
    <span>Descripción</span>
    <span>Fecha de creación</span>
    <span>Jugadores</span>
  </header>
{:else}
  <article>
    <span>{partida.nombre}</span>
    <span>{partida.descripcion}</span>
    <span>{formateaFecha(partida.creado)}</span>
    <span>{partida.jugadores}</span>
    <div class="botonera">
      <button>Jugar</button>
      <button on:click={() => handleClick(partida.id)}>Editar</button>
    </div>
  </article>
{/if}



<style>
  header, article{
    grid-template-columns: 14rem auto 9rem 6rem;
  }

  .botonera{
    grid-column: 1 / 5;
  }
</style>