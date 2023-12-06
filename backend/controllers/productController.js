const asyncHandler = require("express-async-handler")
const Product = require("../models/productModel")

const getProducts = asyncHandler( async (req,res) => {
    const products = await Product.find();
    res.status(200).json(products)
})

const getProduct = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("product not found")
    }
    res.status(200).json(product)
})

const createProduct = asyncHandler( async (req,res) => {
    const {title, price, image, description, rating} = req.body
    console.log("Request body : ", req.body)
    if(!title || !price || !image){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    // console.log("rating", rating)
    const product = await Product.create({
        title, 
        price, 
        image,
        description,
        rating,
        user_id: req.user.id
    })
    res.status(201).json(product)
})

const updateProduct = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("product not found")
    }

    // if(product.user_id.toString() !== req.user.id){
    //     res.status(403);
    //     throw new Error("User don't have permission to update another user's products")
    // }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedProduct)
})

const deleteProduct = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("product not found")
    }

    if(product.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete another user's products")
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}