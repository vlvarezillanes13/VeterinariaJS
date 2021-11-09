const http = require('http');
module.exports = {
    ruta: (data, callback) => {
        callback(200, {mensaje: 'esta es /ruta'});
    },
    /* 
    usuarios: (data, callback) => {
        callback(200, [{nombre: 'usuario1'},{nombre: 'usuario2'}]);
    },
    */
    mascotas: {
        get: (data, callback) => {
            if(data.indice){
                if(global.recursos.mascotas[data.indice]){
                    return callback(200, global.recursos.mascotas[data.indice]);
                }

                return callback(404, {mensaje: `mascota con indice ${data.indice} no encontrada`});
            }
            callback(200, global.recursos.mascotas);
        },
        post: (data, callback) => {
            global.recursos.mascotas.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {
            if(data.indice){
                if(global.recursos.mascotas[data.indice]){
                    global.recursos.mascotas[data.indice] = data.payload;
                    return callback(200, global.recursos.mascotas[data.indice]);
                }

                return callback(404, {mensaje: `mascota con indice ${data.indice} no encontrada`});
            }
            callback(400, { mensaje: "indice no enviado" });
        },
    },

    noEncontrada: (data, callback) => {
        callback(404, {mensaje: 'ruta no encontrada'});
    }
}