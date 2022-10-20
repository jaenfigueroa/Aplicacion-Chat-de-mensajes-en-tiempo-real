////////////////////////////////////////////////////////////////////
const express = require('express')
const server = express()
server.use(express.json())

const cors = require('cors')
server.use(cors())

const fs = require('fs')
////////////////////////////////////////////////////////////////////
var meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Nombiembre', 'Diciembre'
]

var dias = [
  'lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
]

////////////////////////////////////////////////////////////////////
const baseDatos = require('../baseDatos/baseDatos.json')
const usuarios = require('../baseDatos/usuarios.json')

//GUARDAR MENSAJES NUEVOS///////////////////////////////////////////
server.post('/enviarMensaje', (req, res) => {

  const id = Math.floor(Math.random() * 1000000)
  const nombre = req.body.nombre
  const mensaje = req.body.mensaje
  const color = req.body.color
  //-----------------------

  let datos = {
    id: id,
    nombre: nombre,
    mensaje: mensaje,
    fecha: fechaActual(),
    color: color
  }

  baseDatos.mensajes.push(datos)

  fs.writeFileSync('./baseDatos/baseDatos.json', JSON.stringify(baseDatos))

  res.json('Se envio correctamente el mensaje')
})

///ENVIAR ARRAY CON LOS MENSAJES AL CLIENTE//////////////////////////
server.get('/obtenerArray', (req, res) => {
  res.json(baseDatos.mensajes)
})

////////////////////////////////////////////////////////////////////
function fechaActual() {
  let x = new Date()
  //------------------------
  let hora = `${x.getUTCHours()}`.padStart(2, 0)
  let minutos = `${x.getUTCMinutes()}`.padStart(2, 0)
  let fecha = `${x.getUTCDate()}`.padStart(2, 0)
  let mes = meses[x.getUTCMonth()]
  let dia = dias[x.getUTCDay()]

  return `${hora}:${minutos} - ${dia}, ${fecha} de ${mes}`
}

//REGISTRAR NUEVO USUARIO/////////////////////////////////////////////
server.post('/registrate', (req, res) => {
  let nombreUsuario = req.body.nombre
  let passwordUsuario = req.body.password
  let idUsuario = Math.floor(Math.random() * 10000000000)

  let nuevoUsuario = {
    id: idUsuario,
    nombre: nombreUsuario,
    password: passwordUsuario,
  }

  let resultado = usuarios.lista.some(x => x.nombre == nombreUsuario)

  //si existe ese usuario
  if (resultado) {
    res.json({
      respuesta: 'No disponible',
      candado: false
    })
  } else {
    usuarios.lista.push(nuevoUsuario)
    fs.writeFileSync('./baseDatos/usuarios.json', JSON.stringify(usuarios))

    res.send({
      respuesta: 'Disponible',
      candado: true,
      id: idUsuario,
      nombre: nombreUsuario,
      password: passwordUsuario
    })
  }

})

//INICIAR SESION///////////////////////////////////////////////////////
server.post('/iniciarSesion', (req, res) => {
  let nombreUsuario = req.body.nombre
  let passwordUsuario = req.body.password

  //comprobar si el usuario existe
  let existencia = usuarios.lista.some(x => x.nombre === nombreUsuario)

  //comprobar si la contraseña es correcta
  if (existencia) {
    let resultado = usuarios.lista.filter(x => x.nombre === nombreUsuario)
    let contrasena = resultado[0].password

    if (contrasena === passwordUsuario) {
      let nombre = resultado[0].nombre
      let id = resultado[0].id
      let password = resultado[0].password

      res.json({
        resultado: 'contraseña correcta',
        candado1: true,
        candado2: true,
        id, nombre, password
      })

    } else {
      res.json({
        resultado: 'contraseña incorrecta',
        candado1: true,
        candado2: false
      })
    }

  } else {
    res.json({
      resultado: 'usuario no registrado',
      candado1: false,
      candado2: false
    })
  }

})

///COMPROBAR CREDENCIALES//////////////////////////////////////////////////
server.post('/comprobarCredenciales', (req, res) => {

  let userId = req.body.id
  let userPassword = req.body.password

  // console.log(userId);
  // console.log(userPassword);

  let usuarioFiltrado = usuarios.lista.filter(x => x.id == userId)

  // console.log(usuarioFiltrado);

  if (usuarioFiltrado.length === 0) {
    // console.log('vacio');

    res.json({
      candado: false
    })
  } else {

    let idBD = usuarioFiltrado[0].id
    let passwordBD = usuarioFiltrado[0].password
    let nameBD = usuarioFiltrado[0].nombre

    if (userId == idBD && userPassword === passwordBD) {
      res.json({
        candado: true,
        nombre: nameBD,
      })

    } else {
      res.json({
        candado: false
      })
    }

  }

})

////////////////////////////////////////////////////////////////////
server.use(express.static('public'))

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Servidor escuchando en http://localhost:' + PORT)
})

