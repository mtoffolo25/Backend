import { Router } from "express";
import viewProducts from "./Views/viewProducts.routes.js";
import viewCart from "./Views/viewCarts.routes.js";
import sessionRouter from "./Session/session.routes.js";
import userViewRouter from "./Users/user.views.routes.js";
import cookiesRouter from "./Session/session.routes.js";

const router = Router();

router.use('/api/products', viewProducts);
router.use('/api/carts', viewCart);
router.use('/', sessionRouter);
router.use('/users', userViewRouter)
router.use('/cookies', cookiesRouter)

export default router;