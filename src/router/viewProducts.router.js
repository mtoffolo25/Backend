import { Router } from "express";
import { productModel } from "../models/products.model.js";

const router = Router();


router.get('/', async (req, res) => {
    const products = await productModel.find();
    res.render('home', {products});
})

export default router;