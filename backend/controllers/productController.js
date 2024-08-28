import productModel from "../models/productModel.js";
import ProductModel from "../models/productModel.js";
import fs from"fs"
export const addProduct = async (req, res) => {
    let image_file = `${req.file.filename}`
    const product = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category:req.body.category,
        image: image_file
    })
    try {
        await product.save();
        res.status(200).json({
            success:true,
            message: "Product added successfully",
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error Adding the product"
    })
    }
}
 export const allProduct = async(req,res)=>{
    try {
        const products = await productModel.find({})
        res.status(200).json({
            success:"true",
            products:products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"fail",
            message:"bad request"
        })
    }
 }

 export const removeProduct = async(req,res)=>{
    try {
        const product = await productModel.findById(req.body.id)
       fs.unlink(`uploads/${product.image}`,()=>{})

       await productModel.findByIdAndDelete(req.body.id)
       res.status(200).json({
           success:true,
           message:"Product deleted successfully"
       })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"fail",
            message:"bad request"
        })
        
    }
 }