import { Router } from "express";
import { productModel } from "../services/db/models/product.js";

const viewProducts = Router();

viewProducts.get('/', async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    let result = await productModel.paginate({}, { page, limit: 10, lean: true })
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products/?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products/?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result);
})

export default viewProducts;