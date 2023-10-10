import { Router } from "express";
import { productModel } from "../../services/models/product.js";

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

viewProducts.get('/almacenamiento', async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    let result = await productModel.paginate({category: "Almacenamiento"}, { page, limit: 10, lean: true })
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products/?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products/?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result);
})

viewProducts.get('/notebooks', async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    let result = await productModel.paginate({category: "Notebooks"}, { page, limit: 10, lean: true })
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products/?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products/?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result);
})

viewProducts.get('/perisfericos', async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    let result = await productModel.paginate({category: "Perisféricos"}, { page, limit: 10, lean: true })
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products/?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products/?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result);
})

viewProducts.get('/monitores', async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    let result = await productModel.paginate({category: "Monitores"}, { page, limit: 10, lean: true })
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products/?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products/?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result);
})

export default viewProducts;