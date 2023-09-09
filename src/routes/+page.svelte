<script>
	import { campDirigiendo, campJugando } from '$lib/stores';
  import {Login, Register, PartidasDirigidasLista, Tabs} from '$lib/components'
  import { fade } from 'svelte/transition';
	import PartidasJugadasLista from '../lib/components/partidas_jugadas_lista.svelte';
	import { onMount } from 'svelte';
  import { notifications } from '$lib/notificaciones'
	

  export let data
  export let form = undefined
  let items = {
    'Identifícate': {c:Login},
    'Regístrate': {c:Register, p:{fields:form?.fields}}
  }
  let activo = form?.error ? 'Regístrate' : 'Identifícate'

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

{#if !data.user}
  <Tabs {items} {activo}/>
{:else}
  <PartidasDirigidasLista/>
  <PartidasJugadasLista/>
{/if}

