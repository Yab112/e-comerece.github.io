import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        withmesage: "Name is required"
    },
    description: {
        type: String,
        required: true,
        withmesage: "Description is required"
    },
    price: {
    type: Number,
    required: true,
    withmesage: "Price is required"
    },
    image: {
        type: String,
        required: true,
        withmesage: "Image is required"
    },
    category: {
        type: String,
        required: true,
        withmesage: "Cathegory is required"
    }
})

const productModel = mongoose.model.product || mongoose.model("Product", ProductModel);
export default productModel;