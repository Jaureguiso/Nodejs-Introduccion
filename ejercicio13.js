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
	var camino='ejercicio13'+objetourl.pathname;
	if (camino=='ejercicio13/')
		camino='ejercicio13/index.html';
	encaminar(pedido,respuesta,camino);
});

servidor.listen(8888);


function encaminar (pedido,respuesta,camino) 
{
	switch (camino) 
	{
		case 'ejercicio13/cargar': 
		{
			grabarComentarios(pedido,respuesta);
			break;
		}	
		case 'ejercicio13/leercomentarios': 
		{
			leerComentarios(respuesta);
			break;
		}			
	    default : {  
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
						} else {
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


function grabarComentarios(pedido,respuesta) 
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
		'<b>'+'Nombre:'+'</b>'+formulario['nombre']+'<br>'+
		'<b>'+'comentarios:'+'</b>'+formulario['comentarios']+'<br>'+
				   '<a href="index.html">Volver</a>'+
		           '</body></html>';
		respuesta.end(pagina);
		grabarEnArchivo(formulario); 
    });	
}

function grabarEnArchivo(formulario) 
{
	var datos='<b>'+'Nombre:'+'</b>'+formulario['nombre']+'<br>'+
	'<b>'+'comentarios:'+'</b>'+formulario['comentarios']+'<hr>';
	fs.appendFile('ejercicio13/visitas.txt',datos,function(error)
	{
        if (error)
            console.log(error);
    });
}

function leerComentarios(respuesta)
 {
	fs.readFile('ejercicio13/visitas.txt',function (error,datos) 
	{
		respuesta.writeHead(200,
			 {'Content-Type': 'text/html'});
		respuesta.write('<html><head></head><body>');
		respuesta.write(datos);
		respuesta.write('</body></html>');
		respuesta.end();	      
	});
}

console.log('Servidor web iniciado');