import { productModel } from "./models/productModel.js";

export default class ProductManager {

    createProduct = async (product) => {
        const response = await productModel.create(product);
        if (response) {
            return response;
        } else {
            return null;
        }
    };

    getAllProducts = async (limit, page, sort, filter) => {
        const availableFilter = filter ? {} : { available: filter };
        const options = { sort: { price: sort }, limit, page };
        const response = await productModel.paginate(availableFilter, options);
        if (response) {
            return response;
        } else {
            return null;
        }
    };

    getById = async (id) => {
        const response = await productModel.findOne(id);
        if (response) {
            return response;
        } else {
            return null;
        }
    };

    update = async (id, product) => {
        const response = await productModel.updateOne(id, product);
        if (response) {
            return response;
        } else {
            return null;
        }
    };

    delete = async (id) => {
        const response = await productModel.deleteOne(id);
        if (response) {
            return response;
        } else {
            return null;
        }
    };
}