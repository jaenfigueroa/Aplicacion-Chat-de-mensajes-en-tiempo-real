let baseDatosIndividual = []

// const DOMINIO = 'https://primera-version.herokuapp.com'
const DOMINIO = 'https://chat-jaenfigueroa.herokuapp.com'
// const DOMINIO = 'https://aplicacion-de-mensajes-production.up.railway.app'
// const DOMINIO = 'http://localhost:3000'
///////////////////////////////////////////////////////////////
const contenedorMensajes = document.querySelector('#contenedorMensajes')

///////////////////////////////////////////////////////////////////
///OBTENER LA BASE DE DATOS DEL BACKEND////////////////////////////
function ObtenerArrayBD() {
  var url = `${DOMINIO}/obtenerArray`;
  //////////////////
  fetch(url)
    .then((res) => {
      if (res.ok) {
        res.json().then((array) => {
          baseDatosIndividual = array
          // console.log(baseDatosIndividual);
          // console.log(array);
          mostrarMensajes(baseDatosIndividual)
        })
      }
    })
}

///////////////////////////////////////////////////////////////////
//MOSTRAR MENSAJES////////////////////////////////////////////////
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

  // document.scrollTop = document.scrollHeight;
}

///////////////////////////////////////////////////////////////////
//CREAR UN ELEMENTO HTML INDIVIDUAL DE UN MENSAJE//////////////////
function crearElemento(id, nombre, mensaje, fecha, color) {

  return `
  <div class="chat__mensaje" id='mensaje${id}'>
  <div>
    <h3 class="mensaje__nombre" style="color:${color}">${nombre}</h3>
    <p class="mensaje__fecha">${fecha}</p>
  </div>
  <p class="mensaje__texto">${mensaje}</p>
  </div>
  `
}

//////////////////////////////////////////////////////////////////
window.addEventListener('load', () => {

  comprobarCredenciales()

  let nombreUsuario = localStorage.getItem('userName') || ''
  let colorNombre = localStorage.getItem('userColor') || '#ff0000'

  inputColor.value = colorNombre
  nombre.textContent = nombreUsuario

  setInterval(() => {

    ObtenerArrayBD()
  }, 1000);
})

//////////////////////////////////////////////////////////
///CREAR NUEVO MENSAJE ///////////////////////////////////
const botonEnviar = document.querySelector('#botonEnviar')
const nombre = document.querySelector('#inputNombre')
const inputMensaje = document.querySelector('#inputMensaje')
const inputColor = document.querySelector('#inputColor')


botonEnviar.addEventListener('click', (evento) => {
  evento.preventDefault()

  let nombreUsuario = nombre.textContent
  let mensajeUsuario = inputMensaje.value
  let colorUsuario = inputColor.value

  //////////////////
  inputMensaje.value = ''

  enviarMensajeNuevo(nombreUsuario, mensajeUsuario, colorUsuario)
})

///////////////////////////////////////////////////////////////
//ENVIAR MENSAJE NUEVO AL BACKEND//////////////////////////////
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
        res.json().then((Respuesta) => {

          // console.log("Respuesta del servidor:", Respuesta);
        })
      }
    })
}
///////////////////////////////////////////////////////////////
inputColor.addEventListener('input', (evento) => {
  const color = evento.target.value

  localStorage.setItem('userColor', color)
})

///////////////////////////////////////////////////////////////
function comprobarCredenciales() {
  let id = localStorage.getItem('userId')
  let password = localStorage.getItem('userPassword')

  let url = `${DOMINIO}/comprobarCredenciales`

  let contenido = {
    id, password
  }

  // console.log(contenido);

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(contenido), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        res.json().then(({ candado, nombre, color }) => {

          if (candado) {
            console.log('datos correctos');

            localStorage.setItem('userName', nombre)
            localStorage.setItem('userColor', color)
          } else {
            window.location.assign("../IniciarSesion/IniciarSesion.html")
          }
        })
      }
    })
}