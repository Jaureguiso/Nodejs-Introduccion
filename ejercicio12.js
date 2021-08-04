var http=require('http');
var url=require('url');
var fs=require('fs');
var querystring = require('querystring');

var mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

var servidor=http.createServer(function(pedido,respuesta)
{
    var objetourl = url.parse(pedido.url);
	var camino='ejercicio12'+objetourl.pathname;
	if (camino=='ejercicio12/')
		camino='ejercicio12/index.html';
	encaminar(pedido,respuesta,camino);
});

servidor.listen(8888);


function encaminar (pedido,respuesta,camino) 
{
	console.log(camino);
	switch (camino) 
	{
		case 'ejercicio12/recuperardatos':
			{
			recuperar(pedido,respuesta);
			break;
		}	
		default : 
		{  
			fs.exists(camino,function(existe)
			{
				if (existe)
				 {
					fs.readFile(camino,function(error,contenido)
					{
						if (error)
						 {
							respuesta.writeHead(500, {'Content-Type': 'text/plain'});
							respuesta.write('Error interno');
							respuesta.end();					
						}
						 else
						  {
							var vec = camino.split('.');
							var extension=vec[vec.length-1];
							var mimearchivo=mime[extension];
							respuesta.writeHead(200, {'Content-Type': mimearchivo});
							respuesta.write(contenido);
							respuesta.end();
						}
					});
				} 
				else 
				{
					respuesta.writeHead(404, {'Content-Type': 'text/html'});
					respuesta.write(`<html>
										<head></head>
										<body><h2>Recurso Inexistente</h2></body>
								    </html>`);		
					respuesta.end();
				}
			});	
		}
	}	
}


function recuperar(pedido,respuesta) 
{
    var info = '';
	pedido.on('data', function(datosparciales)
	{
         info += datosparciales;
    });
	pedido.on('end', function()
	{
        var formulario = querystring.parse(info);
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		var pagina='<html><head></head><body>'+
		           'Usuario:'+formulario['nombre']+'<br>'+
				   'Contrasenia:'+formulario['clave']+'<br>'+
				   '<a href="index.html">Volver</a>'+
		           '</body></html>';
		respuesta.end(pagina);
    });	
}

console.log('Servidor web iniciado');