let baseDatos = [
  {
    "id": 8787483748,
    "nombre": "Jaen",
    "mensaje": "hola amigos como estan",
    "fecha": "19:05 -- 2 de enero 2022"
  },
  {
    "id": 8787483748,
    "nombre": "Maria",
    "mensaje": "Yo estoy ene le centro de lima",
    "fecha": "19:07 -- 2 de enero 2022"
  },
  {
    "id": 8787483748,
    "nombre": "Pablo",
    "mensaje": "amigos me voy a cenar",
    "fecha": "20: 05 -- 2 de enero 2022"
  },
  // {
  //   "id": 8787483748,
  //   "nombre": "Martin",
  //   "mensaje": "Yo estoy ene le centro de lima",
  //   "fecha": "19:07 -- 2 de enero 2022"
  // },
  // {
  //   "id": 8787483748,
  //   "nombre": "Sofia",
  //   "mensaje": "Yo estoy ene le centro de lima",
  //   "fecha": "19:07 -- 2 de enero 2022"
  // },
  // {
  //   "id": 8787483748,
  //   "nombre": "Fernanda",
  //   "mensaje": "Yo estoy ene le centro de lima",
  //   "fecha": "19:07 -- 2 de enero 2022"
  // },
]

////////////////////////////////////////////////////

const express = require('express')
const server = express()

server.use(express.json())

const cors = require('cors')
server.use(cors())

const fs = require('fs')
////////////////////////////////////////////////
var meses = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'setiembre', 'octubre', 'nombiembre', 'diciembre'
]
////////////////////////////////////////////////

server.post('/enviarMensaje', (req, res) => {

  const id = Math.floor(Math.random() * 1000)
  const nombre = req.body.nombre
  const mensaje = req.body.mensaje
  //-----------------------
  let x = new Date()
  //------------------------
  const fechaActual = `${x.getHours()}:${x.getMinutes()} - ${x.getDay()} de ${meses[x.getMonth()]}`

  let datos = {
    id: id,
    nombre: nombre,
    mensaje: mensaje,
    fecha: fechaActual
  }

  baseDatos.push(datos)

  console.log('se guardo un mensaje nuevo');
  res.json('Se envio correctamente el mensaje')
})

///ENVIAR ARRAY CON LOS MENSAJES/////////////////////////////
server.get('/obtenerArray', (req, res) => {
  res.json(baseDatos)
})

////////////////////////////////////////////////
server.use(express.static('public'))

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Servidor escuchando en http://localhost:' + PORT)
})