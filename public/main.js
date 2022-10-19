let baseDatosIndividual = []
///////////////////////////////////////////////////////////////
const contenedorMensajes = document.querySelector('#contenedorMensajes')

///OBTENER EL ARRAY DE LA BASE DE DATOS////////////////////////

function ObtenerArrayBD() {
  var url = 'https://primera-version.herokuapp.com/obtenerArray';
  //////////////////
  fetch(url)
    .then((res) => {
      if (res.ok) {
        res.json().then((array) => {
          baseDatosIndividual = array
          mostrarMensajes(baseDatosIndividual)
        })
      }
    })
}

//MOSTRAR MENSAJES//////////////////////////////////////////////

let xxx = document.querySelector('#xxx')

function mostrarMensajes() {
  let contenido = ''

  baseDatosIndividual.forEach(elemento => {

    contenido = contenido + crearElemento(
      elemento.id,
      elemento.nombre,
      elemento.mensaje,
      elemento.fecha)
  });

  contenedorMensajes.innerHTML = contenido

  xxx.scrollTop = xxx.scrollHeight;

}
//CREAR UN ELEMENTO INDIVIDUAL/////////////////////////////////////
function crearElemento(id, nombre, mensaje, fecha) {

  return `<div class="main__mensaje" id='mensaje${id}'>
  <p class="mensaje__nombre">${nombre}</p>
  <p class="mensaje__texto" id="respuesta">${mensaje}</p>
  <p class="mensaje__fecha" id="fecha">${fecha}</p>
  </div>`
}

//////////////////////////////////////////////////////////////////
window.addEventListener('load', () => {

  setInterval(() => {
    ObtenerArrayBD()
  }, 1000);
})

//////////////////////////////////////////////////////////
///CREAR NUEVOS MENSAJES /////////////////////////////////
const formulario = document.querySelector('#formulario')
const nombre = document.querySelector('#nombreUsuario')
const inputMensaje = document.querySelector('#inputMensaje')


formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()

  let nombreUsuario = nombre.textContent
  let mensajeUsuario = inputMensaje.value

  //////////////////
  enviarMensajeNuevo(nombreUsuario, mensajeUsuario)
})

///////////////////////////////////////////////////////////////
//ENVIAR MENSAJE NUEVO/////////////////////////////////////////
function enviarMensajeNuevo(nombreUser, mensajeUser) {
  var url = 'https://primera-version.herokuapp.com/enviarMensaje';

  var datos = {
    nombre: nombreUser,
    mensaje: mensajeUser
  };

  /////////////////////////////
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(datos), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        res.json().then((array) => {

          baseDatosIndividual = array
        })
      }
    })
}
///////////////////////////////////////////////////////////////

