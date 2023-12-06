const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required:[true, "Please add the product title"]
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required:[true, "Please add the price of product"]
    },
    image: {
        type: String,
        required:[true, "Please add the image of product"]
    },
    rating:{
        rate:{
            type: Number
        },
        count:{
            type: Number
        }
    }
},{
    timestamps: [true]
});

module.exports = mongoose.model("product", productSchema);