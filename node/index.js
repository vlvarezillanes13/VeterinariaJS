const http = require('http');
const url =  require('url');
const StringDecoder = require("string_decoder").StringDecoder;

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    
    //1.- Obtener ruta desde el objeto
    const urlActual = req.url;
    const urlParseada =  url.parse(urlActual,true);
    //2.- Obtener ruta
    const ruta = urlParseada.pathname;
    //3.- quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g,'');

    //3.1 obtener metodo http
    const metodo = req.method.toLowerCase();

    //3.2 Query
    const { query = {} } = urlParseada;

    //3.3 obtener headers
    const { headers = {} } = req;

    //3.4 obtener payload, en el caso  de haber uno
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    //3.4.1 acumular la data
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    //3.4.2 terminar de acumular data, finalizaar decoder
    req.on('end', () => {
        buffer += decoder.end();

        //3.5 ordenar la data
        const data = {
            ruta: rutaLimpia,
            query,
            metodo,
            headers,
            payload :  buffer
        };

        //3.6 elegir el manejo de la respuesta/handle
        let handler;
        if(rutaLimpia && enrutador[rutaLimpia] ){
            handler = enrutador[rutaLimpia];
        }else{
            handler = enrutador.noEncontrada;
        }

        //4.- ejecutar handle para enviar respuesta
        if(typeof handler === "function"){
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(statusCode);
                res.end(respuesta);
            });
        }

    });
});


const enrutador = {
    ruta: (data, callback) => {
        callback(200, {mensaje: 'esta es /ruta'});
    },
    usuarios: (data, callback) => {
        callback(200, [{nombre: 'usuario1'},{nombre: 'usuario2'}]);
    },
    noEncontrada: (data, callback) => {
        callback(404, {mensaje: 'ruta no encontrada'});
    }
}


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
