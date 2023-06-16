<script>
  import { closeModal } from 'svelte-modals'
	import { fade } from 'svelte/transition'
	import { slide } from "svelte/transition";

  // provided by <Modals />
  export let isOpen = true
  export let component = undefined
  export let prop = undefined

	let m

	function handleKeydown(e){
		if (e.code === 'Escape' && isOpen) closeModal()
	}

</script>



<svelte:window on:keydown={handleKeydown}/>

<div bind:this={m} id="topModal" transition:fade={{duration:75}}>
	<div id='modal' on:click|stopPropagation on:keypress|stopPropagation>
		<div id='modal-content' class="contenedor" transition:slide={{duration:150}}>
			<svelte:component this={component} {...prop}/>
		</div>
	</div>
	{#if isOpen}
		 <button on:click="{closeModal}" transition:fade={{duration:75}}>Cerrar</button>
	{/if}
</div>



<style>
	#topModal {
		display: grid;
    grid-template-rows: min-content 30px;
    grid-template-columns: max-content;
    z-index: 9999;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
    position: fixed;
    background: #1118;
		place-content: center;
		backdrop-filter: blur(12px);
	}

	#modal {
    display: grid;
    grid-template-rows: auto;
    position: relative;
    width: auto;
	}

	#modal-content {
		display: grid;
		max-width: 900px;
		max-height: calc(100vh - 60px);
		overflow: auto;
	}
</style>