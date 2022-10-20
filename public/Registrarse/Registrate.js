const DOMINIO = 'https://primera-version.herokuapp.com'
// const DOMINIO = 'https://aplicacion-de-mensajes-production.up.railway.app'
// const DOMINIO = 'http://localhost:3000'
///////////////////////////////////////////////////////////////
const formulario = document.querySelector('#formulario')
const usuario = document.querySelector('#userName')
const contrasena = document.querySelector('#password')
const botonComprobar = document.querySelector('#botonComprobar')
const aviso1 = document.querySelector('#aviso1')
const aviso2 = document.querySelector('#aviso2')

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()

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
          // window.open('https://www.google.com', "nombre de la ventana", "width=300, height=200")
          if (candado) {
            aviso1.classList.add('bloque__aviso--verde')
            aviso1.textContent = respuesta

            botonComprobar.textContent = 'Continuar'
            botonComprobar.addEventListener('click', abrirChat)

          } else {
            aviso1.classList.add('bloque__aviso--rosa')
            aviso1.textContent = respuesta
          }

        })
      }
    })

})

function abrirChat() {
  window.open("/public/chat/chat.html")
}