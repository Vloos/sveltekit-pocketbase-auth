<script>
  import { createEventDispatcher } from "svelte";
  import { Icons } from "$lib/components";

  const dispatch = createEventDispatcher();
  let name = 'basura'

  
  function pedir() {
    if (name === 'check') {
      confirma()
    } else{
      name = 'check'
    }
  }


  function confirma() {
    dispatch('borrar')
  }


  function anula() {
    name = 'basura'
  }
</script>


<button on:click|stopPropagation={() => {pedir()}} on:blur={() => anula()} title="Borrar">
  <Icons {name}/>
</button>

<style>
  button{
    width: 28px;
    height: 28px;
    padding: 3px;
  }
</style>
