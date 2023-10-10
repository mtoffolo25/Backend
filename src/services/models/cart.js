import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [{
        id: {
            type: mongoose.Types.ObjectId, required: true,
            ref: "products"},
        quantity: { type: Number, required: true },
    }]

})


export const cartModel = mongoose.model(cartCollection, cartSchema);