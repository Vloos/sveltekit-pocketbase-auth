<script>
	import { campDirigiendo, campJugando } from '$lib/stores';
  import {Login, Register, PartidasDirigidasLista} from '$lib/components'
  import { fade } from 'svelte/transition';
	import PartidasJugadasLista from '../lib/components/partidas_jugadas_lista.svelte';
	import { onMount } from 'svelte';
  import { notifications } from '$lib/notificaciones'
	

  export let data
  export let form = undefined
  let secciones = ['Identifícate', 'Regístrate']
  let seccionActiva = form?.error ? 1 : 0


  $: $campJugando = data.jugando
  $: $campDirigiendo = data.dirigiendo


  onMount(() => {
    if (form?.success){
      notifications.success('Usuario registrado correctamente', 3000)
    }

  })

</script>


<svelte:head>
  <title>Gestor de partidas {data.user?.username ? `de ${data.user.username}`: ''}</title>
</svelte:head>

<main>
  {#if !data.user}
    <div class="pesta">
      <header>
        {#each secciones as seccion, i}
          <button on:click={() => seccionActiva = i} class="opcion {seccionActiva == i? 'seleccionado': ''}">{seccion}</button>
        {/each}
      </header>
      <article transition:fade={{duration:75}}>
        {#if seccionActiva === 0}<div transition:fade={{duration:75}}><Login/></div>{/if}
        {#if seccionActiva === 1}<div transition:fade={{duration:75}}><Register fields={form?.fields}/></div>{/if}
      </article>
    </div>
  {:else}
    <PartidasDirigidasLista/>
    <PartidasJugadasLista/>
  {/if}
    
</main>


<style>

  .pesta{
    width: 800px;
  }

  article{
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  article > div{
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

</style>