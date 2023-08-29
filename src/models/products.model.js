import mongoose from "mongoose";

const productsCollection = 'productos';

const productsSquema = new mongoose.Schema({
   title: String,
   description: String,
   price: Number,
   status: Boolean,
   stock: Number,
   category: String,
   thumbnails: String
})

export const productModel = mongoose.model(productsCollection, productsSquema);