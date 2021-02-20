const app = require('./app')
const dotenv = require('dotenv');
const chalk = require('chalk');
const port = process.env.PORT || 3200;
const ConnectToDataBase = require('./configuration/DB')
//Setting Configuration Files 
dotenv.config({ path : 'Server/configuration/config.env'})




//Connecting to database
ConnectToDataBase();


app.listen(port, ()=> {
    if(process.env.NODE_ENV = "DEVELOPMENT") {
    console.log(chalk.bgYellow.white.bold`Server Started on PORT : ${port} in`+`  `+chalk.bgBlueBright`${process.env.NODE_ENV} mode`)
  }
  else {
    console.log(chalk.bgYellow.white.bold`Server Started on PORT : ${port} in`+`  `+chalk.bgRed`${process.env.NODE_ENV} mode`)
    
  }
}) 