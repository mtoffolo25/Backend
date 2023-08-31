import { Router } from "express";
import { cartModel } from "../services/db/models/cart.js";

const viewCart = Router();

viewCart.get('/', async (req, res) => {
    let cartRender = cartModel.find()
    res.render('cart', cartRender)
})

export default viewCart;

