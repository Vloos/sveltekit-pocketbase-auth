<!--
@component

El modal para crear pj, a modo de "wizard", pidiendo información en cada pantalla
1. Información general. Nombre, edad, peso, estatura, historia, descripción.
2. Incapacidades
3. Habilidades
4. Dinero inicial
5. Equipo inicial
-->

<script>
	import Datos from "./nuevo_pj_modal/Datos.svelte";

  let pj = {
    altura: 1,
    edad: 16,
    peso: 40
  }

  let nombre = ''
</script>

<header>Nuevo Pj</header>
<article>
  <header>
    Nombre
  </header>
  <input type="text">
  <Datos {pj} editando={true}/>
</article>