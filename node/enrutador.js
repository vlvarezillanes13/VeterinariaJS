const http = require('http');
const recursos = require('./recursos');
const mascotas = require('./ruta/mascotas');


module.exports = {
    ruta: (data, callback) => {
        callback(200, {mensaje: 'esta es /ruta'});
    },
    /* 
    usuarios: (data, callback) => {
        callback(200, [{nombre: 'usuario1'},{nombre: 'usuario2'}]);
    },
    */
    mascotas: mascotas(recursos.mascotas),
    noEncontrada: (data, callback) => {
        callback(404, {mensaje: 'ruta no encontrada'});
    }
}