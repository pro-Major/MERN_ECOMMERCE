const app = require('./app')
const dotenv = require('dotenv');
const chalk = require('chalk');

//Setting Configuration Files 
dotenv.config({ path : 'Server/configuration/config.env'})

//Setting up the database 
const ConnectToDataBase = require('./configuration/DB')



//Setting up the port   
const port = process.env.PORT ?? 3200;

//Connecting to database
ConnectToDataBase();


app.listen(port, ()=> {
    if(process.env.NODE_ENV = "DEVELOPMENT") {
    console.log(chalk.bgYellow.black`Server Started on PORT : ${port} in`+`  `+chalk.bgBlueBright`${process.env.NODE_ENV} mode`)
  }
  else {
    console.log(chalk.bgYellow.white.bold`Server Started on PORT : ${port} in`+`  `+chalk.bgRed`${process.env.NODE_ENV} mode`)
    
  }
}) 
console.log(process.env.NODE_ENV)
