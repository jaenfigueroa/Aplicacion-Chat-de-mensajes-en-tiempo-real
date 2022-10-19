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

const baseDatos = require('../baseDatos/baseDatos.json')

//GUARDAR MENSAJES NUEVOS///////////////////////////////////////////
server.post('/enviarMensaje', (req, res) => {

  const id = Math.floor(Math.random() * 10000)
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
////////////////////////////////////////////////////////////////////
server.use(express.static('public'))

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Servidor escuchando en http://localhost:' + PORT)
})

