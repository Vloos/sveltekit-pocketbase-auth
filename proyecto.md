# Gestor de personajes

Una aplicación que permite gestionar los personajes de un juego de Rol.
La aplicación permite a los jugadores y al director de juego manipular sus personajes simultáneamente, de forma que los cambios realizados desde el cliente del jugador se ven reflejados inmediatamente en el cliente del director de juego, y viceversa.


## Bibliotecas
- **Sveltekit**: Backend y Frontend.
- **PocketBase**: Base de datos con SQLite.
- **Socket.io**: web sockets.


## Iniciar la aplicación
La aplicación requiere [`NodeJs`](https://nodejs.org)

La carpeta __Base de datos__ contiene el servidor y los archivos de datos de la base de datos.
Para arrancar el servidor introduce el siguiente comando:
```bash
pocketbase serve
```

Para gestionar la base de datos, entra en la url proporcionada al arrancar el servidor e identifícate con el email `admin@ad.min` y la contraseña `adminadmin`


La carpeta __App__ contiene los datos de la aplicación.
El archivo `.env` contiene la configuración para la dirección y puerto desde la que se sirve la aplicación.

```
ORIGIN=http://192.168.0.2:8080
PORT=8080
HOST=192.168.0.2
```

Cambia la dirección ip tanto en ORIGIN como en HOST a una adecuada para la red local.
Cambia el puerto tanto en PORT como en ORIGIN para servir la aplicación en un puerto distinto.

Para arrancar la aplicación, introduce el siguiente comando:
```bash
node build
```

Hay dos usuarios de prueba. Sus nombres son `Test` y `Prueba`. La contraseña es la misma para ambos: `12345678`


## Uso de la aplicacion
### Formulario de registro
**Nombre de usuario**: al menos 3 caracteres que solo pueden ser números o letras.

**Contraseña**: al menos 8 caracteres.

**E-mail**: dirección de correo electrónico. Puede ser completamente falso.

### Formulario de identificación

**Nombre**: Utiliza el nombre de usuario para identificarte

**Contraseña**: La contraseña utilizada en el registro

Al identificarse, la página principal muestra, en la cabecera, el nombre del usuario, un avatar y botones de salir e inicio, y la página de gestión de partidas.
El botón “Salir” termina la sesión de usuario y regresa a la ventana de formularios de ingreso y registro.

El botón “Inicio” navega hacia la ventana de gestión de partidas.
Al hacer click sobre el nombre de usuario, navega hacia la página de configuración del perfil.

### Gestión de partidas
En la página de gestión de partidas se muestran dos paneles:

#### Partidas dirigidas.
Muestra las partidas que organiza el usuario.
El botón “_Crear una partida_” abre un modal con un formulario para crear partidas.
Se requiere un nombre de al menos 4 caracteres y la descripción es opcional.
Pulsa la combinación de teclas mayusculas+enter para crear la partida o el botón “Crear”. El modal se cierra y se navega automáticamente al gestor de la partida recién creada.

Pulsa la tecla esc o el botón “Cerrar” para cerrar el modal sin crear la partida.

La lista de partidas dirigidas muestra el nombre, la descipción, la fecha de creación y la cantidad de jugadores que participan en la partida (sin contar con el organizador)
El botón “_Jugar_” inicia una sesión de juego. El botón “_Editar_” navega hacia el gestor/editor de partidas.

#### Partidas jugadas.
El panel muestra una lista de las partidas en las que el usuario participa como jugador, el nombre de usuario que organiza la partida y el nombre del personaje que se ha asignado en la partida.

### Gestor de partida
La pantalla de gestor de partida presenta tres paneles:

#### Detalles de la partida
Nombre de la partida, descripción de la partida, fecha y hora de la creación de la partida y botones para editar, exportar y eliminar la partida actual.
Al hacer click sobre el botón "_Editar_", el panel queda sustituido por un formulario en el que se puede cambiar el nombre de la partida y la descripción.

No se podrá cambiar el nombre de la partida si el nombre de la partida está vacío.

Al hacer click sobre el botón "_Eliminar_" todos los datos de la partida se eliminan permanentemente y se navega a la pantalla principal de gestión de partidas.

#### Jugadores
El panel de jugadores presenta un listado de los jugadores que participan en la partida y el personaje que tienen asignado.

Para añadir un jugador, introduce un email de usuario registrado en el campo etiquetado como _Correo electrónico_ y pulsa el botón _Añadir Jugador_ o la tecla enter.

Para que un usuario pueda ser añadido a una partida debe haberse identificado al menos una vez y configurado su email como "visible".

Para quitar a un usuario, pulsa el botón _Retirar jugador_, situado debajo del nombre del jugador.

Para asignar un personaje al jugador, arrastra y suelta uno de los personajes de la lista de personajes al area delimitada, que se mostrará cuando comienza el arrastrado.

Solo pueden asignarse personajes no asignados a jugadores sin personajes asignados.

Para quitar la asignación de un personaje a un usuario, pulsa el botón _Retirar Personaje_, situado debajo el nombre de personaje.

Al retirar un jugador, el personaje que tuviera asignado queda liberado automaticamente.

#### Personajes
La lista de personajes muestra los persones disponibles en la partida, y los usuarios a los que están asignados.

Para crear un personaje, introduce el nombre en el campo etiquetado como _Nombre_ y pulsa el botón _Crear personaje_ o la tecla enter.

Para borrar el personaje, pulsa el botón a la derecha, con el icono de un cubo de la basura, titulado _Borrar_, y vuelve a pulsarlo para confirmar el borrado, o pulsa en otro lugar para cancelar.

### Editor de perfil
La pantalla de editor de perfil presenta un panel en el que el usuario puede cambiar el nombre, el email y la situación de visivilidad del mismo, y cambiar la contraseña. También puede ver la fecha de creación de la cuenta de usuario.