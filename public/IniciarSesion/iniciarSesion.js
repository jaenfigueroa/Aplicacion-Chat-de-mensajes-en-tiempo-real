const DOMINIO = 'https://primera-version.herokuapp.com'
// const DOMINIO = 'https://aplicacion-de-mensajes-production.up.railway.app'
// const DOMINIO = 'http://localhost:3000'
///////////////////////////////////////////////////////////////
const formulario = document.querySelector('#formulario')
const aviso1 = document.querySelector('#aviso1')
const aviso2 = document.querySelector('#aviso2')

const inputNombre = document.querySelector('#inputNombre')
const inputPassword = document.querySelector('#inputPassword')

const botonComprobar = document.querySelector('#botonComprobar')

///////////////////////////////////////////////////////////////
botonComprobar.addEventListener('click', (evento) => {
  evento.preventDefault()

  let nombre = inputNombre.value
  let password = inputPassword.value

  let contenido = {
    nombre, password
  }

  let url = `${DOMINIO}/iniciarSesion`

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(contenido), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        res.json().then(({ candado1, candado2, id, nombre, color }) => {

          comprobarCredenciales(candado1, candado2, id, nombre, color)
        })
      }
    })
})


///COMPROBAR CREDENCIALES/////////////////////////////////
function comprobarCredenciales(valor1, valor2, id, nombre, color) {

  if (valor1 && valor2 === true) {

    console.log('primera');
    localStorage.setItem('nombreUser', nombre)
    localStorage.setItem('colorUser', color)
    localStorage.setItem('idUser', id)

    aviso1.classList.add('bloque__aviso--verde')
    aviso2.classList.add('bloque__aviso--verde')

    aviso1.textContent = 'Correcto'
    aviso2.textContent = 'Correcto'

    localStorage.setItem('userName', nombre)
    localStorage.setItem('userId', id)
    localStorage.setItem('userColor', color)

    console.log(localStorage);

    botonComprobar.textContent = 'Continuar'

    botonComprobar.addEventListener('click', (evento) => {
      window.location.assign("../chat/chat.html")
    })

  } else if (valor1 === true && valor2 === false) {
    console.log('segunda');
    aviso1.classList.add('bloque__aviso--verde')
    aviso2.classList.add('bloque__aviso--rosa')

    aviso1.textContent = 'Correcto'
    aviso2.textContent = 'Incorrecto'
  } else {
    console.log('tercera');
    aviso1.classList.add('bloque__aviso--rosa')
    aviso2.classList.add('bloque__aviso--rosa')

    aviso1.textContent = 'Incorrecto'
    aviso2.textContent = 'Incorrecto'
  }

}
///////////////////////////
