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
  let nombreUsuario = req.body.nombre || 'Pepe'
  let passwordUsuario = req.body.password || 'noname'
  let idUsuario = Math.floor(Math.random() * 10000000000)

  let numeroUsuario = {
    id: idUsuario,
    nombre: nombreUsuario,
    password: passwordUsuario,
  }

  let resultado = usuarios.lista.some(x => x.nombre == nombreUsuario)
  console.log(nombreUsuario);

  if (resultado) {
    console.log(nombreUsuario);
    res.send({
      respuesta: 'No disponible',
      candado: false,
      id, nombreUsuario
    })
  } else {
    usuarios.lista.push(numeroUsuario)
    fs.writeFileSync('./baseDatos/usuarios.json', JSON.stringify(usuarios))

    res.send({
      respuesta: 'Disponible',
      candado: true
    })
  }

})

//INICIAR SESION///////////////////////////////////////////////////////
server.post('/iniciarSesion', (req, res) => {
  let nombreUsuario = req.body.nombre || ''
  let passwordUsuario = req.body.password || ''

  //comprobar si el usuario existe
  let existencia = usuarios.lista.some(x => x.nombre === nombreUsuario)

  //comprobar si la contraseña es correcta
  if (existencia) {
    let resultado = usuarios.lista.filter(x => x.nombre === nombreUsuario)
    let contrasena = resultado[0].password

    if (contrasena === passwordUsuario) {
      let color = resultado[0].color || '#ff0000'
      let nombre = resultado[0].nombre
      let id = resultado[0].id

      res.json({
        resultado: 'contraseña correcta',
        candado: true,
        id, nombre, color
      })

    } else {
      res.json({
        resultado: 'contraseña incorrecta',
        candado: false
      })
    }

  } else {
    res.json({
      resultado: 'usuario no registrado',
      candado: false
    })
  }

})

//CAMBIAR COLOR DE USUARIO//////////////////////////////////////////////////
server.post('/guardarColor', (req, res) => {
  let idUser = req.body.id
  let colorUser = req.body.color

  existencia = usuarios.lista.some(x => x.id === idUser)

  if (existencia) {
    let indice = usuarios.lista.findIndex(x => x.id === idUser)
    usuarios.lista[indice].color = colorUser

    fs.writeFileSync('./baseDatos/usuarios.json', JSON.stringify(usuarios))

    res.send('Color del usuario cambiado')
  } else {
    res.send('No existe el usuario')
  }
})

////////////////////////////////////////////////////////////////////
server.use(express.static('public'))

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Servidor escuchando en http://localhost:' + PORT)
})

