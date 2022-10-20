const DOMINIO = 'https://primera-version.herokuapp.com'
// const DOMINIO = 'https://aplicacion-de-mensajes-production.up.railway.app'
// const DOMINIO = 'http://localhost:3000'
///////////////////////////////////////////////////////////////
const formulario = document.querySelector('#formulario')
const usuario = document.querySelector('#userName')
const contrasena = document.querySelector('#password')
const botonComprobar = document.querySelector('#botonComprobar')

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()


  console.log('vava');
  let user = usuario.value
  let password = contrasena.value

  var url = `${DOMINIO}/registrate`;

  let informacion = {
    "nombre": user,
    "password": password
  }

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(informacion), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        res.json().then(({ respuesta, candado }) => {
          console.log(respuesta);
          console.log(candado);
          // window.open("/public/chat/chat.html")
          // console.log("Respuesta del servidor:", Respuesta);

          // window.open('https://www.google.com', "nombre de la ventana", "width=300, height=200")
          if (!candado) {
            botonComprobar.textContent = 'Continuar'
            botonComprobar.addEventListener('click', abrirChat)
          }

        })
      }
    })

})

function abrirChat() {
  window.open("/public/chat/chat.html")
}