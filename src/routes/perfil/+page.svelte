<script>
	import { invalidateAll } from '$app/navigation';
	import { notifications } from '$lib/notificaciones.js';
  import { formateaFecha} from '$lib/utils'
	import { onMount } from 'svelte';

  export let data
  let emailVisibility
  let tempNombre = data.username
  let tempEmail = data.email
  let password = ''
  let passwordConfirm = ''
  let oldPassword = ''

  onMount(() => {
    emailVisibility = data.emailVisibility
  })


  function cambiarMailVis(e){
    const body = JSON.stringify({emailVisibility: e.target.checked})

    fetch('api/usu', {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', accion: 'mailVis'},
      body,
    })
    .then(res => res.json())
    .then(res => {
      if(res?.type === 'success'){
        notifications.success(res.message, 3000)
        emailVisibility = res.value
      }else{
        notifications.warning(res.message, 3000)
      }
    })
  }


  function cambiaEmail(){
    const body = JSON.stringify({email: tempEmail})
    fetch('api/usu', {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', accion: 'email'},
      body,
    })
    .then(res => res.json())
    .then(res => {
      if(res?.type === 'success'){
        notifications.success(res.message, 3000)
      }else{
        notifications.warning(res.message, 3000)
      }
    })
  }

  
  function cambiaNombre(){
    const body = JSON.stringify({username: tempNombre})
    fetch('api/usu', {
      method: 'PATCH',
      headers: {'Content-Type':'application/json', accion: 'uName'},
      body
    })
    .then(res => res.json())
    .then(res => {
      if(res?.type === 'success'){
        notifications.success(res.message, 3000)
        invalidateAll()
      }else{
        
      }
    })
  }


  function cambiaPass(){
    const body = JSON.stringify({password, passwordConfirm, oldPassword})
    fetch('api/usu', {
      method: 'PATCH',
      headers: {'Content-Type':'application/json', accion: 'pass'},
      body
    })
    .then(res => res.json())
    .then(res => {
      if(res?.type === 'success'){
        notifications.success(res.message, 3000)
        borraPass()
      }else{
        notifications.warning(res.message, 3000)
      }
    })
  }


  function borraPass(){
    password = ''
        passwordConfirm = ''
        oldPassword = ''
  }
</script>


<svelte:head>
  <title>Editor de perfil: {data.user.username}</title>
</svelte:head>

<main>
  <section>
    
      <article class="nombre">
        <label class="etiqueta" for="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre" bind:value={tempNombre}>
        <div class="botonera">
          <button on:click={cambiaNombre} disabled={tempNombre == data.username}>Confirmar cambios</button>
          <button on:click={() => {tempNombre = data.username}} disabled={tempNombre == data.username}>Deshacer</button>
        </div>
      </article>
    
      <article class="mail">
        <label class="etiqueta" for="email">Email</label>
        <input type="email" name="email" id="email" bind:value={tempEmail}>
        <div class="botonera">
          <button on:click={cambiaEmail} disabled={tempEmail == data.email}>Confirmar cambios</button>
          <button on:click={() => {tempEmail = data.email}} disabled={tempEmail == data.email}>Deshacer</button>
        </div>
        <label class="etiqueta" for="visible">Visible
        <input type="checkbox" name="visible" id="visible" on:click={(e) => {cambiarMailVis(e)}} bind:checked={emailVisibility}></label>
        {#if emailVisibility}
          <span>Otros usuarios pueden invitarte a su partida</span>
        {:else}
          <span>Otros usuarios no podrán invitarte a sus partidas</span>  
        {/if}
      </article>

      <article class="pass">
        <div class="formel">
          <label class="etiqueta" for="password">Nueva contraseña</label>
          <input type="password" name="password" id="password" bind:value={password}>
          {#if password.length < 8}
            <span id="chars">Mínimo de 8 carácteres ({8 - password.length})</span>
          {:else}
            <span id="chars">✔</span>
          {/if}
        </div>

        <div class="formel">
          <label class="etiqueta" for="passwordConfirm">Confirmar contraseña</label>
          <input type="password" name="passwordConfirm" id="passwordConfirm" bind:value={passwordConfirm}>
          {#if passwordConfirm.length === 0}
            <span id="confs">La confirmación no puede estar vacía</span>
          {:else if password !== passwordConfirm}
            <span id="confs">No coincide con la contraseña</span>
          {:else}
            <span id="confs">✔</span>
          {/if}
        </div>

        <div class="formel">
          <label class="etiqueta" for="oldpass">Contraseña</label>
          <input type="password" name="oldpass" id="oldpass" bind:value={oldPassword}>
        </div>
        <div class="botonera">
          <button 
            on:click={cambiaPass} 
            disabled = {(password.length < 8 && passwordConfirm.length < 8 ) || password !== passwordConfirm}
          >Confirmar cambios</button>
          <button on:click={borraPass} disabled={password == '' && passwordConfirm == '' && oldPassword == ''}>Deshacer</button>
        </div>
      </article>

      <article class="fecha">
        <span class="etiqueta">Fecha de creación</span><span class="lafecha">{formateaFecha(data.created, 'full', 'full')}</span>
      </article>

  </section>
</main>


<style>
  section{
    width:800px;
  }

  .mail, .nombre{
    grid-template-columns: min-content auto min-content;
  }

  .mail span{
    text-align: left;
  }

  label{
    width: 100%;
  }

  .pass, .formel{
    grid-template-columns: repeat(2, 1fr);
  }

  .formel span{
    grid-column: 1 / 3;
    text-align: end;
  }

  .formel{
    display: grid;
  }

  .fecha{
    grid-template-columns: min-content auto;
  }


  button{
    white-space: nowrap;
  }
</style>