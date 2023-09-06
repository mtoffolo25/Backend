import { Router } from "express";
import viewProducts from "./viewProducts.routes.js";
import viewCart from "./viewCarts.routes.js";
import sessionRouter from "./session.routes.js";
import userViewRouter from "./user.views.routes.js";
import cookiesRouter from "./session.routes.js";

const router = Router();

router.use('/api/products', viewProducts);
router.use('/api/carts', viewCart);
router.use('/', sessionRouter);
router.use('/users', userViewRouter)
router.use('/cookies', cookiesRouter)

export default router;