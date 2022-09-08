const mongoose = require('mongoose');
const {Schema}   = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is a mandatory field"],
        minLength: [4, "Atleast four characters are required in the product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minLength: [20, "Atleast 20 characters are required in the product name"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [100, "Minimun value of price must be atleast 100"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images:[
        {
            publicId: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Plase enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        max: [100, "Stock cannot be more than 100 products"],
        default: 1
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            name:{
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }


})

module.exports = mongoose.model("product", productSchema);