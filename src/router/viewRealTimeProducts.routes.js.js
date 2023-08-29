import { Router } from "express";
import { productModel } from "../models/products.model";

const router = Router();

router.get('/', async (req, res) => {
    const products = await productModel.find();
    res.render('realTimeProducts', {products});
})

export default router;