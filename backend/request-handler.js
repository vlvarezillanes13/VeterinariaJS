const http = require('http');
const url =  require('url');
const StringDecoder = require("string_decoder").StringDecoder;
const enrutador = require('./enrutador');

module.exports = http.createServer((req, res) => {
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

    //3.1.1 dar permisos de CORS escribiendo los headers
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "OPTIONS,GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","*");

    //3.1.2 dar respuesta inmediata cuando el método sea options
    if(metodo === "options"){
        res.writeHead(200);
        res.end();
        return;
    }
    
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

        if (headers["content-type"] === "application/json"){
            buffer = JSON.parse(buffer);
        }

        //3.4.3 revisar sub-rutas
        if(rutaLimpia.indexOf("/") > -1 ){

            var [ rutaPrincipal, indice] = rutaLimpia.split('/');
        }

        //3.5 ordenar la data
        const data = {
            indice,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload :  buffer
        };

        console.log({data});
        //3.6 elegir el manejo de la respuesta/handle
        let handler;
        if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo] ){
            handler = enrutador[data.ruta][metodo];
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
