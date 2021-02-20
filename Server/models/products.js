const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    Pname : {
        type : string,
        required: [true, 'Please Enter Product Name'],
        trim : true,
        maxLength: [100, 'Product name cannot exceed 100 characters']

    },
    Pprice: {
        type : Number,
        required : [true, 'Please Enter Product Price '],
        maxLength: [5, 'Product Price must be under 5 characters'],
        default: 0

    },
    Pdescription: {
        type : String,
        required :[true, 'Please Enter Product Description '],

    },
    PRatings: { type : Number,
    default : 0,
    },
    pImages: {
        type: Array,
        required: true,
      },
    PCategories: { 
        type : String,
        required: [true, 'Please Select Category For This Product']
    }




})
module.exports= mongoose.model("Products", productsSchema)