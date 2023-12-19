import { Router } from "express";
import viewProducts from "./Views/viewProducts.routes.js";
import userRouter from "./Mongo/users.routes.js";
import userViewRouter from "./Views/user.views.routes.js";
import cartRouter from "./Mongo/carts.routes.js"
import productRouter from "./Mongo/products.routes.js"
import detailProducts from "./Views/viewDetail.router.js";
import ticketRouter from "./Mongo/ticket.routes.js";
import mockingProducts from "./Mock/mocking.routes.js";
import mailRouter from "./Mongo/email.routes.js"


const router = Router();

router.use('/api/products', productRouter );
router.use('/carts', cartRouter);
router.use('/api/users', userRouter);
router.use('/users', userViewRouter);
router.use('/', viewProducts);
router.use('/products/detail', detailProducts);
router.use('/ticket', ticketRouter);
router.use('/mockingProducts', mockingProducts);
router.use('/email', mailRouter)


export default router;


