const http=require('http');
const url=require('url');
const fs=require('fs');

const servidor=http.createServer( (pedido,respuesta) => 
{
  const objetourl = url.parse(pedido.url);
  let camino;
  camino='ejercicio9'+objetourl.pathname;

  if (camino=='ejercicio9/')
    camino='ejercicio9/index.html';
  fs.stat(camino, error => 
    {
    if (!error) 
    {
      fs.readFile(camino, (error,contenido) => 
      {
        if (error)
         {
          respuesta.writeHead(500, {'Content-Type': 'text/plain'});
          respuesta.write('Error interno');
          respuesta.end();					
        } else 
        {
          respuesta.writeHead(200, {'Content-Type': 'text/html'});
          respuesta.write(contenido);
          respuesta.end();
        }
      });
    } else 
    {
      respuesta.writeHead(404, {'Content-Type': 'text/html'});
      respuesta.write(`<html>
                     <head></head>
                     <body><h2>Recurso Inexistente</h2></body>
                   </html>`);	
      respuesta.end();
    }
  });
});

servidor.listen(8888);

console.log('Servidor web iniciado');