let baseDatos = [
  // {
  //   "id": 8787483748,
  //   "nombre": "Jaen",
  //   "mensaje": "Hola 😀",
  //   "fecha": "2 de febrero"
  // }
]

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

//GUARDAR MENSAJES NUEVOS///////////////////////////////////////////
server.post('/enviarMensaje', (req, res) => {

  const id = Math.floor(Math.random() * 1000)
  const nombre = req.body.nombre
  const mensaje = req.body.mensaje
  const color = req.body.color
  //-----------------------
  let x = new Date()
  //------------------------
  let hora = `${x.getUTCHours()}`.padStart(2, 0)
  let minutos = `${x.getUTCMinutes()}`.padStart(2, 0)
  let fecha = `${x.getUTCDate()}`.padStart(2, 0)
  let mes = meses[x.getUTCMonth()]
  let dia = dias[x.getUTCDay()]

  const fechaActual = `${hora}:${minutos} - ${dia}, ${fecha} de ${mes}`

  let datos = {
    id: id,
    nombre: nombre,
    mensaje: mensaje,
    fecha: fechaActual,
    color: color
  }

  baseDatos.push(datos)

  console.log(baseDatos);
  res.json('Se envio correctamente el mensaje')
})

///ENVIAR ARRAY CON LOS MENSAJES AL CLIENTE//////////////////////////
server.get('/obtenerArray', (req, res) => {
  res.json(baseDatos)
})

////////////////////////////////////////////////////////////////////
server.use(express.static('public'))

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Servidor escuchando en http://localhost:' + PORT)
})

