const fs=require('fs');

fs.readFile('./ejercicio5.txt', (error,datos) => 
{
  if (error)

    console.log(error);

  else
  
    console.log(datos.toString());
});

console.log('última línea del programa');