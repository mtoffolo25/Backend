import { productModel } from "./models/productModel.js";

export default class ProductManager {

    async isCodeUnique(code) {
        try {
            const products = await this.getProducts();
            return products.some((product) => product.code === code);
        } catch (error) {
            console.log(error);
        }
    }
    
    validateFields(product) {
        return (
            product.title &&
            product.description &&
            typeof product.price === 'number' &&
            typeof product.status === 'boolean' &&
            typeof product.stock === 'number' &&
            product.category &&
            typeof product.title === 'string' &&
            typeof product.description === 'string' &&
            typeof product.category === 'string'
        );
    }

    async addProduct(product) {
        try {
            if(await this.isCodeUnique(product)) {
                return { code: 409, status: 'Este producto ya existe' };
            }
            if(!this.validateFields(product)) {
                return { code: 400, status: 'Todos los campos del producto deben ser ingresados' };
            }
            let result = await productModel.create(product);
            return { code: 200, status: 'Producto agregado', product: result };
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(optionsQuery, options) {
        try {
            const products = await productModel.paginate(optionsQuery, options);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            return product ? product : false;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(id) {
        try {
            const product = await this.getProductById(id);
            if(product) {
                await productModel.deleteOne({ _id: id });
                return { code: 200, status: 'Producto eliminado' };
            } else {
                return { code: 404, status: 'Producto no existe' };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const product = await productModel.findByIdAndUpdate(id, updatedFields, { new: true });
            if(product) {
                return { code: 200, status: 'Producto actualizado' };
            } else {
                return { code: 404, status: 'Producto no encontrado' };
            }
        } catch (error) {
            console.log(error);
        }
    }
}
