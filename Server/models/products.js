const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    Pname : {
        type : String,
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
    Pimages: {
        type: Array,
        required: false,
      },
    Pcategories: { 
        type : String,
        required: [false, 'Please Select Category For This Product'],
        enum: {
                values : [
                    'Electronic',
                    'Camera',
                    'Laptop',
                    'Accessories',
                    'Headphones',
                    'books',
                    'Clothes/Shoes',
                    'Beauty/Health',
                    'Sports',
                    'Outdoor',
                    'Home',
                  
                ],
                message: 'Please Select a Category'
        }
    },
    Pseller: {
        type: 'String',
        required: [true,'Please Enter a Product Seller ']
    },
    Pstocks:{
        type:'Number',
        required: [true, 'Please Enter Product Stock'],
        maxLength: [5, 'Product Name cannot 5 characters '],
        default : 0,

    },
    PNumberofReviews:{ 
        type:'Number',
        default : 0,

    },
    ProductReviews:[
        {
            name: {
                type : String,
                required: true,
            },
            rating: {
                type : Number,
                required: true,
            },
            comments : {
                type : String,
                required: true,
            }
        }
    ],
    CreatedAT: {
        type : Date,
        default : Date.now
    }




})
module.exports= mongoose.model("Products", productsSchema)