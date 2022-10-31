let baseDatosIndividual = []

const DOMINIO = 'https://chat-jaenfigueroa.herokuapp.com'
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
var meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Nombiembre', 'Diciembre'
]

var dias = [
  'lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
]



function crearElemento(id, nombre, mensaje, fecha, color) {

  let fechaACT = new Date(fecha)

  let dia = dias[fechaACT.getDay() - 1]
  let numero = fechaACT.getDate()
  let mes = meses[fechaACT.getMonth()]
  let año = fechaACT.getFullYear()
  let hora = fechaACT.getHours()
  let minuto = fechaACT.getMinutes()

  let fechaSTR = `${dia},${hora}:${minuto}, ${numero} ${mes} ${año}`

  return `
  <div class="chat__mensaje" id='mensaje${id}'>
  <div>
    <h3 class="mensaje__nombre" style="color:${color}">${nombre}</h3>
    <p class="mensaje__fecha">${fechaSTR}</p>
  </div>
  <p class="mensaje__texto">${mensaje}</p>
  </div>
  `
}

//////////////////////////////////////////////////////////////////
window.addEventListener('load', () => {

  comprobarCredenciales()

  let userName = localStorage.getItem('userName')
  mostrarNombre.textContent = userName

  let userColor = localStorage.getItem('userColor')
  inputColor.value = userColor || '#ff0000'

  setInterval(() => {

    ObtenerArrayBD()
  }, 1000);
})

//////////////////////////////////////////////////////////
///CREAR NUEVO MENSAJE ///////////////////////////////////
const botonEnviar = document.querySelector('#botonEnviar')
const mostrarNombre = document.querySelector('#mostrarNombre')
const inputMensaje = document.querySelector('#inputMensaje')
const inputColor = document.querySelector('#inputColor')


botonEnviar.addEventListener('click', (evento) => {
  evento.preventDefault()

  let nombreUsuario = mostrarNombre.textContent
  let mensajeUsuario = inputMensaje.value
  let colorUsuario = inputColor.value

  //////////////////
  inputMensaje.value = ''

  if (mensajeUsuario) {
    enviarMensajeNuevo(nombreUsuario, mensajeUsuario, colorUsuario)
  }

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

///ENVIAR COLOR NUEVO////////////////////////////////////////////
inputColor.addEventListener('input', (evento) => {
  const color = evento.target.value

  localStorage.setItem('userColor', color)
})

//COMPROBAR CREDENCIALES///////////////////////////////////////////
function comprobarCredenciales() {
  let id = localStorage.getItem('userId')
  let password = localStorage.getItem('userPassword')

  if (id === null || password === null) {
    window.location.assign("../IniciarSesion/IniciarSesion.html")

  } else {

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
          res.json().then(({ candado, nombre }) => {

            if (candado) {

              localStorage.setItem('userName', nombre)
              mostrarNombre.textContent = nombre

            } else {
              window.location.assign("../IniciarSesion/IniciarSesion.html")
            }
          })
        }
      })
  }
}