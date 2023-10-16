import { Router } from "express";
import viewProducts from "./Views/viewProducts.routes.js";
import sessionRouter from "./Mongo/session.routes.js";
import userViewRouter from "./Views/user.views.routes.js";
import cookiesRouter from "./Mongo/cookies.routes.js";
import cartRouter from "./Mongo/carts.routes.js"
import productRouter from "./Mongo/products.routes.js"
import detailProducts from "./Views/viewDetail.router.js";
import ticketRouter from "./Mongo/ticket.routes.js";

const router = Router();

router.use('/api/products', productRouter );
router.use('/carts', cartRouter);
router.use('/', sessionRouter);
router.use('/users', userViewRouter);
router.use('/cookies', cookiesRouter);
router.use('/products', viewProducts);
router.use('/products/detail', detailProducts);
router.use('/ticket', ticketRouter)

export default router;

