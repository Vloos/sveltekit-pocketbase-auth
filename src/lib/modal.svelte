<!--
@component
Uso:
1. Crea una variable llamada "modal", por ejemplo
```ts
let modal : import('$lib/components/modal.svelte').default
```
2. Bindea el componente a la variable
```js
<Modal bind:this={modal}/>
```
3. llamar a la funcion "abrir" del componente, como parámetro un objeto que tiene el componente y una lista de props del componente.
El segundo parametro, para mostrar o no el botón para cerrar el modal (predeterminado: true). 
```js
modal.abrir({c:Componente, p:{prop:'valor', prop2:5}}, false)
```
4. El componente debería tener una prop llamada "cerrarFn" que es una función utilizada para cerrar el modal desde el componente.
```
<button on:click={cerrarFn}>Cerrar</button>
```
-->


<script>
	import { fade } from "svelte/transition";

  /**@type {Object.<any, any>}*/
  let p
  /**@type {ConstructorOfATypedSvelteComponent | undefined}*/
  let c
  /**@type {HTMLDialogElement}*/
  let modal
  /**@type {boolean}*/
  let mostrarCerrar = true

  /**
   * cuando c es undefined, comienza la animación.
   * cuando la animación termina, se dispara close()
   */
  export function cerrar() {
    p = undefined;
    c = undefined;
  }

  /**
   * Cuando c es un componente, comienza la animación.
   * cuando la animación comienza, se dispara showModal()
   * c: componente
   * p: objeto con props
   * @param {{c:ConstructorOfATypedSvelteComponent, p:Object.<string, any>}} modalData componente y props para mostrar en el modal
   * @param {boolean} bCerrar mostrar el botón predeterminado para cerrar el modal
   */
  export function abrir(modalData, bCerrar = true) {
    p = modalData.p || {}
    p.cerrarFn = cerrar
    c = modalData.c
    mostrarCerrar = bCerrar
  }
</script>


{#if c}
  <dialog
    bind:this={modal}
    on:cancel|preventDefault={cerrar}
    on:introstart={() => modal.showModal()}
    on:outroend={() => {modal.close()}}
    transition:fade={{duration:75}}
  >
    <section>
      <svelte:component this={c} {...p}/>
    </section>
    {#if mostrarCerrar}
      <button
        on:click={cerrar}
      >Cerrar</button>
    {/if}
  </dialog>
{/if}


<style>
  dialog{
    margin: auto auto;
    border: none;
    background: transparent;
    overflow: auto;
    width: max-content;
  }

  dialog[open] {
    display: grid;
  }

  dialog::backdrop {
    backdrop-filter: blur(8px);
    background: var(--bg-main);
  }
</style>