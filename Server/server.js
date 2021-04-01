//Setting Configuration Files 
const dotenv = require('dotenv');
dotenv.config({ path : 'Server/config/.env'})
// require('dotenv').config({path : 'Server/configuration/.env'});
const app = require('./app')
const chalk = require('chalk');







//Handling UnHandled Promise Rejections
process.on('unhandledRejection',err => {
  console.log(chalk.bgWhite.black`Error : ${err.message}`);
  console.log(chalk.red`Shutting Down The Server Due to Unhandled Promises`);
  server.close(()=> {
    process.exit(1)
  })
})





//Handling Uncaught Exceptions
process.on('uncaughtException',err =>{
console.log(chalk.bgWhite.black`Error : ${err.message}`);
  console.log(chalk.bgWhite.red.bold`Shutting Down The Server Due to uncaught Exceptions`);
  server.close(()=> {
    process.exit(1)
  })
})




//Setting up the database 
const ConnectToDataBase = require('./configuration/DB');
//Connecting to database
ConnectToDataBase();



//Setting up the port   
const port = process.env.PORT ?? 3200;

//Setting up Node ENV
const NODE_ENV = process.env.NODE_ENV;

//Running The Server
const server = app.listen(port, ()=> {
  
    console.log(chalk.bgYellow.black`Server Started on PORT : ${port} in`+`  `+chalk.bgBlueBright`${NODE_ENV}`+` mode`)
  
}) 

