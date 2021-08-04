const fs=require('fs');

fs.writeFile('./ejercicio5.txt', 'Hola\nMundo', error => 
{
  if (error)

    console.log(error);

  else
  
    console.log('El archivo fue creado');
});

console.log('última línea del programa');