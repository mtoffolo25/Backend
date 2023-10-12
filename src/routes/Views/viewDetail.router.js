import { Router } from "express";
import { productModel } from "../../services/models/productModel.js";

const detailProducts = Router();

detailProducts.get('/:pid', async (req, res) => {
    let pid = req.params.pid;
    let detail = await productModel.findById(pid).lean();
    res.render('detailProducts', detail);
})

export default detailProducts;