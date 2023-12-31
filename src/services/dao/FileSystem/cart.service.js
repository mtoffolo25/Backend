import fs from 'fs';
import { __dirname } from '../../../utils.js';
import ProductService from './product.services.js';

const prodService = new ProductService();

export default class CartService {
    #carts;
    #cartDirPath;
    #cartFilePath;
    #fileSystem;


    constructor() {
        this.#carts = new Array();
        this.#cartDirPath = __dirname + "/Data";
        this.#cartFilePath = this.#cartDirPath + "/Carts.json";
        this.#fileSystem = fs;
    }


    isCodeDuplicated(id) {
        return this.#carts.some(cart => cart.id === id);
    }

    #preparararDirectorioBase = async () => {
        // Creamos el directorio si no existe
        await this.#fileSystem.promises.mkdir(this.#cartDirPath, { recursive: true });
        // Verificamos si el archivo existe
        if (!this.#fileSystem.existsSync(this.#cartFilePath)) {
            await this.#fileSystem.promises.writeFile(this.#cartFilePath, '[]');
        }
    }


    createCart = async (data) => {
        try {
            await this.#preparararDirectorioBase();
            // Leemos el contenido del archivo de carritos
            let cartsFile = await this.#fileSystem.promises.readFile(this.#cartFilePath, 'utf-8');
            // Intentamos analizar el contenido del archivo como JSON
            this.#carts = JSON.parse(cartsFile);
            let id = this.#carts.length + 1
            let cartCreated = {
                products: data.products,
                id:id
            }
            // Verificamos si el código del carrito ya existe
            if (this.isCodeDuplicated(cart.id)) {
                console.log("El carrito ya existe");
            }
            // Agregamos el nuevo carrito al array
            this.#carts.push(cart);
            // Guardamos el array de carritos actualizado en el archivo
            await this.#fileSystem.promises.writeFile(this.#cartFilePath, JSON.stringify(this.#carts, null, 2));
            if (cartCreated) {
                return cartCreated;
            }
        } catch (error) {
            console.error(`Error al crear el carrito nuevo: ${JSON.stringify(cart)}, detalle del error: ${error}`);
            throw Error(`Error al crear el carrito nuevo: ${JSON.stringify(cart)}, detalle del error: ${error}`);
        }
    };

    getCartById = async (data) => {
        const cid = parseInt(data._id);
        try {
            await this.#preparararDirectorioBase();

            let cartsFile = await this.#fileSystem.promises.readFile(this.#cartFilePath, 'utf-8');
            this.#carts = JSON.parse(cartsFile);
            let cart = this.#carts.find(cart => cart.id === cid);
            if (cart) {
                return cart;
            }
        }
        catch (error) {
            console.error(`Error al obtener el producto con id: ${cid}, detalle del error: ${error}`);
        }
    };

    prodInCart = async (cid, pid) => {
        const idc = parseInt(cid._id);
        const idp = parseInt(pid._id);
        
        try {
            await this.#preparararDirectorioBase();
            let cartsFile = await this.#fileSystem.promises.readFile(this.#cartFilePath, 'utf-8');
            this.#carts = JSON.parse(cartsFile);
            let cart = this.#carts.find(cart => cart.id === idc);
            const product = await prodService.getById(idp)
                const productToAdd = {
                    product,
                    quantity: 1
                }; 
            if (cart) {
                // Buscamos si el productId ya existe en el carrito
                const existingProduct = cart.products.find(item => item.id === productToAdd.id);
                if (existingProduct) {
                    // Si el productId ya existe, incrementamos la cantidad en 1
                    existingProduct.quantity += 1;
                } else {
                    // Si el productId no existe, agregamos el nuevo producto al carrito
                    cart.products.push(productToAdd);
                }
                await this.#fileSystem.promises.writeFile(this.#cartFilePath, JSON.stringify(this.#carts, null, 2));
                return cart;
            };
        } catch (error) {
            console.error(`Error al agregar el producto al carrito: ${id}, detalle del error: ${error}`);
            throw Error(`Error al agregar el producto al carrito: ${id}, detalle del error: ${error}`);
        };
    };

    deleteProdInCart = async (cid, pid) => {
        const idc = parseInt(cid._id);
        const idp = parseInt(pid._id);
        try {
            //creamos el directorio si no existe
            await this.#fileSystem.promises.mkdir(this.#cartDirPath, { recursive: true });
            //verificamos si el archivo existe
            if (!this.#fileSystem.existsSync(this.#cartFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#cartFilePath, '[]');
            }
            let cartsFile = await this.#fileSystem.promises.readFile(this.#cartFilePath, 'utf-8');
            this.#carts = JSON.parse(cartsFile);
            let cart = this.#carts.find(cart => cart.id === idc);
            const product = await prodService.getById(idp)
            const productToDel = {
                product,
                quantity: 1
            }
            console.log(productToDel);
            if (cart) {
                // Buscamos si el productId ya existe en el carrito
                const existingProduct = cart.products.find(item => item.id === productToDel.id);
                    // Si el productId ya existe, restamos uno o lo eliminamos 
                    existingProduct.quantity > 1 ?
                        existingProduct.quantity -= 1 :
                        cart.products.splice(cart.products.indexOf(existingProduct), 1);              
                await this.#fileSystem.promises.writeFile(this.#cartFilePath, JSON.stringify(this.#carts, null, 2));
                return cart;
            }
        } catch (error) {
            console.error(`Error al elminar el producto al carrito: ${id}, detalle del error: ${error}`);
            throw Error(`Error al eliminar el producto al carrito: ${id}, detalle del error: ${error}`);
        }
    };

    deleteAll = async (data) => {
        const cid = parseInt(data._id)
        try {
            await this.#fileSystem.promises.mkdir(this.#cartDirPath, { recursive: true });
            let cartsFile = await this.#fileSystem.promises.readFile(this.#cartFilePath, 'utf-8');
            this.#carts = JSON.parse(cartsFile);
            let cart = this.#carts.find(cart => cart.id === cid);
            if (cart) {
                // Buscamos el carrito y lo vaciamos
                cart.products.splice(0, cart.products.length);
                await this.#fileSystem.promises.writeFile(this.#cartFilePath, JSON.stringify(this.#carts, null, 2));
                return cart;
            }
        } catch (error) {
            console.error(`Error al vaciar el carrito: ${id}, detalle del error: ${error}`);
            throw Error(`Error erro al vaciar el carrito: ${id}, detalle del error: ${error}`);
        }
    };
};