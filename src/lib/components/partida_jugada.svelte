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
  <span>Director</span>
  <span>Personaje</span>
</header>
{:else}
  <article>
    <span>{partida.nombre_campa}</span>
    <span>{partida.name_dj}</span>
    <span>{partida.nombre_pj}</span>
  </article>
{/if}


<style>
  header, article{
    display: grid;
    grid-template-columns: 14rem auto 8rem;
  }
</style>