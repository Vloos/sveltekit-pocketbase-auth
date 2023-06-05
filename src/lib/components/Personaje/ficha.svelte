<script>
  import Personaje from '$lib/pj/Personaje'
  export let pj
</script>



<section>
  <header>Características</header>
  <ul>
    {#each Personaje.nombreCar as car,i (i)}
      <li>
        <article>
          <header>{car}</header>
          <span>
            <input 
              type="number" 
              min={Personaje.minMaxCarPuntos[0]} 
              max={Personaje.maxMaxCarPuntos[1]} 
              bind:value={pj.caracteristicas[i]}>
            </span>
        </article>
      </li>
    {/each}
  </ul>
</section>

<section>
  <header>Habilidades</header>
  <ul>
    {#each Personaje.nombreHabs as hab, i (i)}
      <li>
        <article>
          <header>{hab} <span>{Personaje.nombreCar[Personaje.habMods[i]]}</span></header>
          <span>
            <input 
              type="number"
              min={Personaje.minManxHabPuntos[0]}
              max={Personaje.maxManxHabPuntos[1]}
              bind:value={pj.habilidadesNivel[i]}
              >
              +{pj.habDatos(i).carNivel}
          </span>
          <span>
            {pj.habDatos(i).total}
          </span>
        </article>
      </li>
    {/each}
  </ul>
</section>