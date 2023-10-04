import { Router } from "express";
import { cartModel } from "../../models/cart.js";

const viewCart = Router();

viewCart.get('/', async (req, res) => {
    let cartRender = cartModel.find()
    res.render('cart', cartRender)
})

export default viewCart;

