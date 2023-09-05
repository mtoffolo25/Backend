import { Router } from "express";
import products from "./products.routes.js";
import cart from "./carts.routes.js";
import viewProducts from "./viewProducts.routes.js";
import viewCart from "./viewCarts.routes.js";
import sessionRouter from "./session.routes.js";
import userViewRouter from "./user.views.routes.js";

const router = Router();

router.use('/api/products', products);
router.use('/api/carts', cart);
router.use('/', viewProducts);
router.use('/viewCart', viewCart)
router.use('/api/sessions', sessionRouter)
router.use('/users', userViewRouter)

export default router;