const http = require('http');
const recursos = require('./recursos');
const mascotas = require('./ruta/mascotas');
const veterinarios = require('./ruta/veterinarios');
const duenos = require('./ruta/duenos');
const consultas = require('./ruta/consultas');

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
    veterinarios: veterinarios(recursos.veterinarios),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos.consultas),
    noEncontrada: (data, callback) => {
        callback(404, {mensaje: 'ruta no encontrada'});
    }
}