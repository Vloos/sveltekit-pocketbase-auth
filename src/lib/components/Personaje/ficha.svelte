<script>
  import Personaje from '$lib/pj/Personaje'
  export let pj = undefined
</script>



{#if pj}
  <section>
    <header>{pj.nombre}</header>
  </section>
  <section class="cara">
    <header>Características</header>
    <ul>
      {#each Personaje.nombreCar as car, i (i)}
        <li>
          <article>
            <header>{car}</header>
            <span>
              <input 
                type="number" 
                min={Personaje.minMaxCarPuntos[0]} 
                max={Personaje.minMaxCarPuntos[1]} 
                bind:value={pj.caracteristicas[i]}>
              </span>
          </article>
        </li>
      {/each}
    </ul>
  </section>

  <section class="habs">
    <header>Habilidades</header>
    <ul>
      {#each Personaje.nombreHabs as hab, i (i)}
        <li>
          <article>
            <header>{hab} <span class="mod">{Personaje.nombreCar[Personaje.habMods[i]]}</span></header> 
            <span>
              <input 
                type="number"
                min={Personaje.minMaxHabPuntos[0]}
                max={Personaje.minMaxHabPuntos[1]}
                bind:value={pj.habilidadesNivel[i]}
              >
            </span>
            <span>
              {pj.habDatos(i).carNivel > 0 ? '+': ''}{pj.habDatos(i).carNivel}
            </span>
            <span>
              {pj.habDatos(i).total}
            </span>
          </article>
        </li>
      {/each}
    </ul>
  </section>
{/if}



<style>
  section{
    width: 800px;
    overflow: auto;
  }

  .mod{
    font-weight: 400;
  }
  .cara ul{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .cara ul li article{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .habs ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .habs ul li article{
    display: grid;
    grid-template-columns: 4fr repeat(3, 1fr);
  }

  span{
    height: 100%;
    display: grid;
    align-items: stretch;
    align-content: center;
    justify-items: stretch;
  }

  input[type="number"]{
    height: 100%;
    max-height: 100%;
    text-align: center;
  }

</style>