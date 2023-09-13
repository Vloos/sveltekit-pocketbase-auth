<!--
@component
Uso:
1. importa modals, junto con el componente
```js
import Modal, {modals} from '$lib/componets/modal.svelte'
```
2. Coloca el componente en el layout principal
3. Llamar a la funcion "open" de modals para abrir un modal, como parámetro, un objeto que tiene el componente, una lista de props del componente y un booleano que indica si debe ocultar el botón predeterminado para cerrar el modal (que muestra si no se pone nada).
Si no se muestra el botón, el modal no se puede cerrar con la tecla "esc" (viene bien para cuadros de dialogo?)
```js
modal.abrir({c:Componente, p:{prop:'valor', prop2:5}, cerrarBtn: false})
```
4. Para cerrar el modal, modals.close() cierra el último modal abierto. O se pasa el indice del modal que se quiere cerrar
```html
<button on:click="{() => {modals.close()}}">Cerrar</button>
```
-->


<script context="module">
  import { writable } from "svelte/store";

  export const modals = modalstore()

  function modalstore(){
    const {subscribe, set, update} = writable(new Array())

    return {
      subscribe, set,
      /**@param {{c: import('svelte').SvelteComponent, p?:Object.<string, any>, cerrarBtn?:boolean}} modalData */
      open: (modalData) => update((m) => {
        const cerrarBtn = modalData?.cerrarBtn == undefined ? true : modalData.cerrarBtn
        m.push({...modalData, cerrarBtn})
        return m
      }),
      /**@param {number | undefined} index*/
      close: (index = undefined) => update((m) => {
        m.splice(index || m.length-1)
        return m
      }),
    }
  }
</script>


<script>
	import { scale  } from "svelte/transition";

  /**@type {Array.<HTMLDialogElement>}*/
  let modalcomponentlist = []


  /**
   * Si hay boton de cerrar, esc cierra el modal
   * @param {number} i indice del modal que se cierra
   */
  function cerrar(i) {
    if ($modals[i].cerrarBtn) modals.close(i)
  }
</script>

<div class="modalconainer">
  {#each $modals as m, i}
    <dialog
      bind:this={modalcomponentlist[i]}
      transition:scale={{ duration: 75, start: 0.95}}
      on:introstart={() => modalcomponentlist[i].showModal()}
      on:cancel|preventDefault={() => {cerrar(i)}}
    >
      <section>
        <svelte:component this={m.c} {...m.p}/>
      </section>
      {#if m.cerrarBtn}
        <button
          on:click={() => {cerrar(i)}}
        >Cerrar</button>
      {/if}
    </dialog>  
  {/each}
</div>


<style>
  dialog{
    margin: auto auto;
    border: none;
    background: transparent;
    overflow: auto;
  }

  dialog[open] {
    display: grid;
    width: fit-content;
  }

  dialog::backdrop {
    backdrop-filter: blur(2px);
    background: var(--bg-main);
  }
</style>