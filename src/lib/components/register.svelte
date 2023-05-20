<script>
  export let fields = undefined
  let nombre = fields?.username ?? ''
  let pass = fields?.password ?? ''
  let confpass = fields?.passwordConfirm ?? ''
  let email = fields?.email ?? ''
</script>



<form class="contenedor2" action="?/register" method="POST">
  <div class="formel">
    <label for="username">Nombre</label>
    <input type="text" name="username" id="username" bind:value={nombre} maxlength="150">
    <label for="email">Correo electrónico</label>
    <input type="email" name="email" id="email" bind:value={email}>
    {#if nombre.length < 3}
      <span id="connom">Mínimo de 3 letras o números ({3 - nombre.length}) </span>
    {:else}
      <span id="connom">✔</span>
    {/if}
  </div>
  <div class="formel pass">
    <label id="passlab" for="password">Contraseña</label>
    <input type="password" name="password" id="password" bind:value={pass}>
    <label id="conpasslab" for="passwordConfirm">Confirmar contraseña</label>
    <input type="password" name="passwordConfirm" id="passwordConfirm" bind:value={confpass}>
    {#if pass.length < 8}
      <span id="chars">Mínimo de 8 carácteres ({8 - pass.length})</span>
    {:else}
      <span id="chars">✔</span>
    {/if}

    {#if confpass.length === 0}
      <span id="confs">La confirmación no puede estar vacía</span>
    {:else if pass !== confpass}
      <span id="confs">No coincide con la contraseña</span>
    {:else}
      <span id="confs">✔</span>
    {/if}
  </div>
  <button
    type="submit"
    disabled = {(pass.length < 8 && confpass.length < 8 ) || nombre.length < 3 || pass !== confpass}
  >Registrarse</button>
</form>
{#if fields !== undefined}
  <span>Error al registrar el usuario</span>
{/if}



<style>
  .formel{
    display: grid;
    grid-template-columns:  6rem 1fr 11rem 1fr;
    gap: 4px;
  }
  
  #chars, #connom{
    grid-column: 2 / 3;
  }
  
  #confs{
    grid-column: 3 / 5;
  }
</style>