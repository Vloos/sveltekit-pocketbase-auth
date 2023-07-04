<script>
	import { page } from '$app/stores';
  import { generateRandomGradientCSS } from '$lib/utils'
	import { onMount } from 'svelte';
  import { getImageURL } from '$lib/utils.js';
  

  export let nombre = $page.data.user?.username
  let file = $page.data.user?.avatar
  let coleccion = $page.data.user?.collectionId
  let record = $page.data.user?.id
  let size = '50x50'


  let url = Boolean(file) && getImageURL(coleccion, record, file, size)
  let avatar;
  let letra = nombre[0].toUpperCase()

  onMount(() => {
    if (avatar){
      avatar.style.background =  generateRandomGradientCSS()
    }
  })
</script>


{#if url}
  <div id="avatar">
    <img src={url} alt={`Avatar de ${nombre}`}>
  </div>
{:else}
  <div id="avatarLetra" bind:this={avatar}>
    {letra}
  </div>
{/if}



<style>
  #avatarLetra, #avatar{
    display: grid;
    place-content: center;
    height: 50px;
    width: 50px;
    font-size: 46px;
    font-weight: 700;
  }
</style>