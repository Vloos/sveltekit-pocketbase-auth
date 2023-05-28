import Pocketbase from 'pocketbase'
import { serializeNonPOJOs } from '$lib/utils'


// se llama cada vez que hay una petición a la aplicación
export const handle = async ({event, resolve}) => {

  event.locals.pb = new Pocketbase('http://127.0.0.1:8090') // crea instancia de pocketbase dentro de event.locals (event es un objeto que se pasa por la aplicación que contiene los datos de las peticiones)
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')   // coge la información de la cookie si la hay, y la mete en el almacén de identificación.
  
  // comprueba la validez de la información de identificación almacenada en el almacén
  if (event.locals.pb.authStore.isValid){
    event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model)  // si es correcto, coge el modelo del almacén de autorización
  } else {
    //console.log('INDENTIFICACION MAL')
    event.locals.user = undefined   // si es incorrecta, no hay usuario
  }

  const response = await resolve(event)   // espera a que las peticiones se realicen y prepara la respuesta

  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({secure: false}))   // establece la cookie con el último acceso válido

  console.log(`${response.status}`)
  return response
}
