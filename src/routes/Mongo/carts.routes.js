import { Router } from "express";
import { creatNewCart, searchCart, putProductToCart, deleteProductFromCart, cleanCart, downQuantity, renderCart } from "../../controllers/cart.controller.js";
import { createTicket } from '../../controllers/ticket.controller.js'

const cartRouter = Router();


cartRouter.post('/', creatNewCart);


cartRouter.get ('/search/:cid', searchCart);


cartRouter.put('/:cid/products/add/:pid', putProductToCart);


cartRouter.delete('/:cid/products/reduce/:pid', downQuantity);


cartRouter.delete('/:cid/products/delete/:pid', deleteProductFromCart);


cartRouter.put('/:cid/clean', cleanCart);


cartRouter.get('/:cid', renderCart);


cartRouter.post('/:cid/purchase', createTicket);

export default cartRouter;