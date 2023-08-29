import { Router } from "express";
import { productModel } from "../models/products.model.js";

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  try {
    let users = await productModel.find();
    console.log(users);
    res.send({ result: 'success', payload: users })
} catch (error) {
    console.error("No se pudo obtener usuarios con moongose: " + error);
    res.status(500).send({ error: "No se pudo obtener usuarios con moongose", message: error });
}
});

productsRouter.post('/', async (req, res) => {
  try {
    let { title, description, price, status, stock, category, thumbnails } = req.body
    let user = await productModel.create({ title, description, price, status, stock, category, thumbnails });
    res.status(201).send({ result: 'success', payload: user })
} catch (error) {
    console.error("No se pudo crear usuarios con moongose: " + error);
    res.status(500).send({ error: "No se pudo crear usuarios con moongose", message: error });
}
});

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await productModel.findById(pid);
    if(product) {
      res.send({status: "success", payload: product });
    }else {
      res.status(404).json({'error': 'Producto no encontrado'});
    }
});

productsRouter.put('/:pid', async (req, res) => {
  try {
    let userUpdated = req.body;
    let user = await productModel.updateOne({ _id: req.params.id }, userUpdated);
    res.status(202).send(user);
} catch (error) {
    console.error("No se pudo obtener usuarios con moongose: " + error);
    res.status(500).send({ error: "No se pudo obtener usuarios con moongose", message: error });
}
})

productsRouter.delete('/:pid', async (req, res) => {
  try {
    let { id } = req.params;
    let result = await productModel.deleteOne({ _id: id })
    res.status(202).send({ status: "success", payload: result });
} catch (error) {
    console.error("No se pudo obtener usuarios con moongose: " + error);
    res.status(500).send({ error: "No se pudo obtener usuarios con moongose", message: error });
}
})

export default productsRouter;