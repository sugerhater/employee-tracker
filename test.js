let figlet = require('figlet');
const util = require('util');

figlet=util.promisify(figlet);

async function print(data){
   let toPrint = await figlet(data)
   console.log(toPrint);
}
print('abc');
// figlet('Employee\n\n Manager',(err,data)=>{
//   if (err) throw err;
//   console.log(data);
// })
// console.log(figlet('Employee\n\n Manager'))