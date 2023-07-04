<script>
	import { goto } from "$app/navigation";
  import {formateaFecha} from "$lib/utils"
	export let partida = undefined
</script>



{#if !partida}
  <header class="titulo2">
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
      <button on:click={() => {goto(`/dj/${partida.id}/jugar`)}}>Jugar</button>
      <button on:click={() => {goto(`/dj/${partida.id}/administrar`)}}>Editar</button>
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