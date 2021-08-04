const http=require('http');

const servidor=http.createServer((pedido,respuesta) => 
{
  respuesta.writeHead(200, {'Content-Type': 'text/html'});
  respuesta.write(`<html>
                    <head></head>
                   <body><h2><u>Actualmente este sitio se encuentra desarrollo</u></h2></body>
                   </html>`);

  respuesta.end();
});

servidor.listen(8888);

console.log('El servidor web se ha iniciado');