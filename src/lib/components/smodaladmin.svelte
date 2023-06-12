<script>
  import { Modals, openModal } from 'svelte-modals'
  import { SModalSlot } from '$lib/components';
  import { fade } from 'svelte/transition';
  import { amod } from '$lib/stores'

  /* Componentes modal */
  import { CrearPartidaModal } from '$lib/components'

  $amod = abrirModal


/**
 * Abre un modal
 * @param {String} t nombre del modal
 * @param {Objet} d props para el componente
 */
  function abrirModal(t, d) {
    let cual ={  // nombreModal: {c: componenteModal, prop: {props}},
      crearPartida: {c:CrearPartidaModal},
    }

    openModal(SModalSlot, {component: cual[t].c, prop: cual[t].prop})

  }
</script>



<Modals>
  <div
    slot="backdrop"
    class="backdrop"
    transition:fade={{duration:75}}
  />
</Modals>



<style>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50);
  }
</style>