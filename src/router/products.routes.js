import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const productsRouter = Router();
const manager = new ProductManager('./src/data/products.json');

productsRouter.get('/', async (req, res) => {
    try {
      const { limit } = req.query;
      let products = await manager.getProducts();
      if (limit) {
        let newProducts = products.slice(0, limit);
        products = newProducts;
      }
  
      res.send({status: "success", payload: products });
    } catch (error) {
      res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
});

productsRouter.post('/', async (req, res) => {
  try {
    let productToAdd = req.body;
    if (!('status' in productToAdd)) {
      productToAdd.status = true;
    }
    let status = await manager.addProduct(productToAdd);
    res.status(status.code).json({status: status.status})
  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
  }
});

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await manager.getProductById(parseInt(pid));
    if(product) {
      res.send({status: "success", payload: product });
    }else {
      res.status(404).json({'error': 'Producto no encontrado'});
    }
});

productsRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params;
    let productToUpdate = req.body;
    let status = await manager.updateProduct(parseInt(pid), productToUpdate);
    res.status(status.code).json({status: status.status});
})

productsRouter.delete('/:pid', async (req, res) => {
  const {pid} = req.params;
  let status = await manager.deleteProductById(parseInt(pid));
  res.status(status.code).json({status: status.status});
})

export default productsRouter;