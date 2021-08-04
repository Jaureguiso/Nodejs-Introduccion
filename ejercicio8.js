const http=require('http');
const url=require('url');

const servidor=http.createServer((pedido,respuesta) =>
 {
  const objetourl = url.parse(pedido.url);
  console.log('camino completo del recurso y parametros:'+objetourl.path);
  console.log('solo el camino y nombre del recurso     :'+objetourl.pathname)
  console.log('parametros del recurso                  :'+objetourl.query)

  respuesta.writeHead(200, {'Content-Type': 'text/html'});
  respuesta.write(`<html>
                     <head></head>
                     <body><h2>Hola Mundo</h2></body>
                   </html>`);
  respuesta.end();
});

servidor.listen(8888);

console.log('Servidor web iniciado');
