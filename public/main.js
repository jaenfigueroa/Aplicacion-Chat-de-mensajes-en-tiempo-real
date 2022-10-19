let baseDatosIndividual = []
const DOMINIO = 'https://primera-version.herokuapp.com'
// const DOMINIO = 'http://localhost:3000'
///////////////////////////////////////////////////////////////
const contenedorMensajes = document.querySelector('#contenedorMensajes')

///OBTENER EL ARRAY DE LA BASE DE DATOS////////////////////////

function ObtenerArrayBD() {
  var url = `${DOMINIO}/obtenerArray`;
  //////////////////
  fetch(url)
    .then((res) => {
      if (res.ok) {
        res.json().then((array) => {
          baseDatosIndividual = array
          console.log(baseDatosIndividual);
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
      elemento.fecha,
      elemento.color)
  });

  contenedorMensajes.innerHTML = contenido

  xxx.scrollTop = xxx.scrollHeight;

}
//CREAR UN ELEMENTO INDIVIDUAL/////////////////////////////////////
function crearElemento(id, nombre, mensaje, fecha, color) {

  return `<div class="main__mensaje" id='mensaje${id}'>
  <p class="mensaje__nombre" style="color:${color}">${nombre}</p>
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
const nombre = document.querySelector('#inputNombre')
const inputMensaje = document.querySelector('#inputMensaje')
const inputColor = document.querySelector('#inputColor')


formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()

  let nombreUsuario = nombre.value
  let mensajeUsuario = inputMensaje.value
  let colorUsuario = inputColor.value

  //////////////////
  enviarMensajeNuevo(nombreUsuario, mensajeUsuario, colorUsuario)
})

///////////////////////////////////////////////////////////////
//ENVIAR MENSAJE NUEVO/////////////////////////////////////////
function enviarMensajeNuevo(nombreUser, mensajeUser, colorUsuario) {
  var url = `${DOMINIO}/enviarMensaje`;

  var datos = {
    nombre: nombreUser,
    mensaje: mensajeUser,
    color: colorUsuario
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

