<script>
	import { enhance } from "$app/forms";
  import { notifications } from '$lib/notifications'

  let nombre = ''
  let password = ''

  function submitForm ({form, data, action, cancel}) {
    if (nombre.length < 3 || password.length < 8) cancel()
    return async ({result, update}) => { 
      switch (result.type) {
        case 'redirect':
          await update()
          break
        default:
          notifications.warning(result.error.message)
      }
    }
  }

</script>



<form class="contenedor2" action="?/login" method="POST" use:enhance={submitForm}>
  <div class="formel">
    <label for="username">Nombre</label>
    <input type="text" name="username" id="username" bind:value={nombre}>
  </div>
  <div class="formel">
    <label for="password">Contraseña</label>
    <input type="password" name="password" id="password" bind:value={password}>
  </div>
  <button type="submit" disabled={nombre.length < 3 || password.length < 8}>Identificarse</button>
</form>



<style>
  .formel{
    display: grid;
    grid-template-columns: 6rem auto;
    gap: 4px;
  }
</style>