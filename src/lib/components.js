import BotonBorrar from './components/botonborrar.svelte'
import CrearPartidaModal from './components/crear_partida_modal.svelte'
import Icons from './components/icons.svelte'
import InfoCampa from './components/infocampa.svelte'
import JugadoresPartida from './components/jugadores_partida.svelte'
import JugadorPartida from './components/jugador_partida.svelte'
import Login from './components/login.svelte'
import Modal from "./components/modal.svelte";
import Notificacion from './components/notificacion.svelte'
import ParticipantesLista from './components/participantes_lista.svelte'
import PartidaDirigida from './components/partida_dirigida.svelte'
import PartidaJugada from './components/partida_jugada.svelte'
import PartidasDirigidasLista from './components/partidas_dirigidas_lista.svelte'
import PartidasJugadasLista from './components/partidas_jugadas_lista.svelte'
import PersonajePartida from './components/personaje_partida.svelte'
import PersonajesPartidaLista from './components/personajes_partida_lista.svelte'
import Register from './components/register.svelte'
import Tabs from "./components/tabs.svelte";
import UserAvatar from './components/userAvatar.svelte'

// chat
import Chat from './components/chat/cajachat.svelte'
import PrivadoModal from './components/chat/privado_modal.svelte'
import MensajeChat from './components/chat/mensaje_chat.svelte'

export { Notificacion, Icons, BotonBorrar, PersonajePartida, Login, Register, UserAvatar, PartidaDirigida, PartidasDirigidasLista, 
  PartidaJugada, PartidasJugadasLista, InfoCampa, JugadoresPartida, ParticipantesLista,
  JugadorPartida, Tabs, CrearPartidaModal, PersonajesPartidaLista, Chat, PrivadoModal, MensajeChat, Modal}