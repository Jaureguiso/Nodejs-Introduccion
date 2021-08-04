const os=require('os');

console.log('Memoria libre antes de crear el vector:'+os.freemem());

const vec=[];
let x=0;
for(x;x<1000000;x++) 
{
  vec.push(x);
}	
console.log('Memoria libre después de crear el vector:'+os.freemem());