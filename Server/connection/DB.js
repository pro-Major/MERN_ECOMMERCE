const mongoose = require('mongoose');
const chalk = require('chalk')
//Connection with the Database
const ConnectToDataBase = ()=> {
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(()=> {console.log(`${chalk.cyan('✓ ')}` + chalk.bgGreenBright.white.bold("Connected with Mongo DataBase"))}) 
      .catch((error)=> {console.log(`${chalk.red.bold('X ')}`+
        error)}) 
    
    
}


  module.exports = ConnectToDataBase;