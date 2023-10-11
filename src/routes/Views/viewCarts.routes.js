import { Router } from "express";
import { cartModel } from "../../services/models/cartModel.js";

const viewCart = Router();

viewCart.get('/:cid', async (req, res) => {
    let cid = req.params.cid;
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    
    const cartProducts= await cartModel.findById({_id : cid}).populate('products.product');

    if (!cartProducts) {
            return res.status(404).send('Carrito no encontrado');
    }

    let prevLink = cartProducts.hasPrevPage ? `http://localhost:8080/cart?page=${cartProducts.prevPage}` : '';
    let nextLink = cartProducts.hasNextPage ? `http://localhost:8080/cart?page=${cartProducts.nextPage}` : '';
    let isValid = !(cartProducts.page <= 0 || cartProducts.page > cartProducts.totalPages)
    res.render('cart', { cartProducts, prevLink, nextLink, isValid })
});

export default viewCart;
