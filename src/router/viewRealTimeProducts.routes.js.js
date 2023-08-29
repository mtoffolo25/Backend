import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const router = Router();
const manager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('realTimeProducts', {products});
})

export default router;