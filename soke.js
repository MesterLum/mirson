//Config express
const express = require('express')(),
app = require('http').createServer(express),
io = require('socket.io')(app)

const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const port = new SerialPort('/dev/tty.usbmodem1411')
const parser = new Readline()

port.pipe(parser);
var dataSending;

var focos = {
foco1: false,
foco2: false
}

io.on('connection', socket => {
socket.emit('first', focos)
socket.on('change focos', (data) => {
    socket.broadcast.emit('everyone', focos)
    port.write(`${data}\n`)
})
})
parser.on('data', data => {

dataSending = data

let datos = data.split(',')


    if (datos[0] == '0'){
        focos.foco1 = false
    }     
    else if (datos[0] == '1'){
        focos.foco1 = true
    }
        
    if (datos[1] == '0\r')
        focos.foco2 = false
    else if (datos[1] == '1\r')
        focos.foco2 = true
    console.log(focos)
    //console.log("focos ", datos)

});



console.log('server running...')
app.listen(5050)