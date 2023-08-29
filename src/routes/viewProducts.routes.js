import { Router } from "express";
import { productModel } from "../services/db/models/product.js";

const viewProducts = Router();

viewProducts.get('/', async (req, res) => {
    const products = await productModel.find().lean();
    res.render('home', {products});
})

export default viewProducts;