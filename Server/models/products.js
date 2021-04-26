const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Please Enter Product Name'],
        trim : true,
        maxLength: [100, 'Product name cannot exceed 100 characters']

    },
    price: {
        type : Number,
        required : [true, 'Please Enter Product Price '],
        maxLength: [5, 'Product Price must be under 5 characters'],
        default: 0

    },
    description: {
        type : String,
        required :[true, 'Please Enter Product Description '],

    },
    ratings: { type : Number,
                default : 0,
    },
    images: [
       { type: Array,
        required: false,}
    ],
    category: { 
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
                message: 'Please Select a Category for Product'
        }
        
    },
    seller: {
        type: String,
        required: [true,'Please Enter a Product Seller ']
    },
    stock:{
        type: Number,
        required: [true, 'Please Enter Product Stock'],
        maxLength: [5, 'Product Name cannot 5 characters '],
        default : 0,

    },
    numOfReviews:{ 
        type:Number,
        default : 0,

    },
    reviews:[
        {    
            user : { 
                type : mongoose.Schema.ObjectId,
                ref : 'User',
                required : true
            },
            name: {
                type : String,
                required: true,
            },
            rating: {
                type : Number,
                required: true,
            },
            comment : {
                type : String,
                required: true,
            }
        }
    ],
    user : { type : mongoose.Schema.ObjectId,
            ref : 'User',
            required : true
    },
    createdAt: {
        type : Date,
        default : Date.now
    }




})
module.exports= mongoose.model("Products", productsSchema)