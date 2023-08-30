import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = 'productos';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number, 
    status: Boolean,
    code: String,
    stock: Number,
    category: String,
    thumbnail: String,
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productsCollection, productSchema);