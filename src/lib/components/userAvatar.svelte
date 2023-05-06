<script>
  import { generateRandomGradientCSS } from '$lib/utils'
	import { onMount } from 'svelte';
	
  export let nombre = undefined
  let avatar;
  let letra = nombre[0].toUpperCase()

  onMount(() => {
    avatar.style.background =  generateRandomGradientCSS()
  })
</script>



<div id="avatar" bind:this={avatar}>
  {letra}  
</div>



<style>
  #avatar{
    display: grid;
    place-content: center;
    height: 50px;
    width: 50px;
    font-size: 46px;
    font-weight: 700;
  }
</style>