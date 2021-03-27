//Setting Configuration Files 
// const dotenv = require('dotenv');
// const result = dotenv.config({ path : 'Server/configuration/config.env'})
require('dotenv').config({path : 'Server/configuration/.env'});



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
const { path } = require('./app');



//Setting up the port   
const port = process.env.PORT ?? 3200;

//Connecting to database
ConnectToDataBase();


const server = app.listen(port, ()=> {
    if(process.env.NODE_ENV = "DEVELOPMENT") {
    console.log(chalk.bgYellow.black`Server Started on PORT : ${port} in`+`  `+chalk.bgBlueBright`${process.env.NODE_ENV} mode`)
  }
  else {
    console.log(chalk.bgYellow.white.bold`Server Started on PORT : ${port} in`+`  `+chalk.bgRed` PRODUCTION MODE`)
    
  }
}) 

