import { Router } from "express";
import viewProducts from "./Views/viewProducts.routes.js";
import viewCart from "./Views/viewCarts.routes.js";
import sessionRouter from "./Session/session.routes.js";
import userViewRouter from "./Users/user.views.routes.js";
import cookiesRouter from "./Session/session.routes.js";
import cartRouter from "./Mongo/carts.routes.js"
import productRouter from "./Mongo/products.routes.js"

const router = Router();

router.use('/api/products', productRouter );
router.use('/api/carts', cartRouter);
router.use('/', sessionRouter);
router.use('/users', userViewRouter);
router.use('/cookies', cookiesRouter);
router.use('/products', viewProducts);
router.use("/cart", viewCart);

export default router;

