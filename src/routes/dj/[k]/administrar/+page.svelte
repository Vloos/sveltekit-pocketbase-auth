<script>
	import { InfoCampa, JugadoresPartida, PersonajesPartidaLista} from '$lib/components'
  import { pjs, js } from '$lib/stores'

  export let data

  $pjs = data.personajes
  $js = data.jugadores
  
  let creado = new Date(data.campa.created)
  creado = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full', timeStyle: 'long'}).format(creado)
</script>

<svelte:head>
  <title>Gestor de partida: {data.campa.nombre}</title>
</svelte:head>

<main>
  <InfoCampa campa = {data.campa}/>
  <JugadoresPartida/>
  <PersonajesPartidaLista/>
</main>