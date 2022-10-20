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
  console.log(contenido);

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

          // console.log("Respuesta del servidor:", Respuesta);
          // console.log(respuesta);
          if (candado1 && candado2 === true) {
            localStorage.setItem('nombreUser', nombre)
            localStorage.setItem('colorUser', color)
            localStorage.setItem('idUser', id)

            aviso1.textContent = 'Correcto'
            aviso2.textContent = 'Correcto'

            aviso1.classList.add('bloque__aviso--verde')
            aviso2.classList.add('bloque__aviso--verde')
          } else if (candado1 === true && candado2 === false) {

            aviso1.textContent = 'Correcto'
            aviso2.textContent = 'Incorrecto'

            aviso1.classList.add('bloque__aviso--verde')
            aviso2.classList.add('bloque__aviso--rosa')
          } {
            aviso1.textContent = 'Incorrecto'
            aviso2.textContent = 'Incorrecto'

            aviso1.classList.add('bloque__aviso--rosa')
            aviso2.classList.add('bloque__aviso--rosa')
          }

        })
      }
    })
})