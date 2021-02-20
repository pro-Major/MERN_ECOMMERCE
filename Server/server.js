const app = require('./app')
const dotenv = require('dotenv');

//Setting Configuration Files 
dotenv.config({path : 'SERVER/configuration/config.env'})


 





app.listen(process.env.PORT, ()=> {
    console.log(`Server Started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})