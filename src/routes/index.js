import { Router } from "express";
import products from "./products.routes.js";
import cart from "./carts.routes.js";
import viewProducts from "./viewProducts.routes.js";
import viewCart from "./viewCarts.routes.js";

const router = Router();

router.use('/api/products', products);
router.use('/api/carts', cart);
router.use('/viewProducts', viewProducts);
router.use('/viewCart', viewCart)

export default router;