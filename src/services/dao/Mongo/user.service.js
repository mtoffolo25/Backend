import userModel from "./models/userModel.js";
import { productModel } from "./models/productModel.js";
import { createHash } from "../../../utils.js";
import { isValidPassword } from '../../../utils.js';
import { generateToken } from '../../../utils.js';
import envConfig from '../../../config/env.config.js';
import CartServices from "./cart.service.js"
import UserDto from "../../dto/user.dto.js";

const cartServices = new CartServices();

const PORT = envConfig.port
export default class UserService {

    getAll = async () => {
        let users = await userModel.find();
        let usersDto = users.map(user => new UserDto(user));
        return usersDto;
    };

    save = async (data) => {    
        try {
            const exists = await userModel.findOne({ email:data.email });
            if (exists) {
                return null;
            };
            data.password = createHash(data.password); 
            let user = await userModel.create(data);
            const userId = user._id.toString();
            const  body  = {
                userId,
                products: [],
            }
            let cart = await cartServices.createCart(body);

            if (cart && user) {
                user.carts.push({ "cart": cart._id});
                await user.save();
                return user;
            
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error en la creación del usuario: " + error.message);       
        }
    };


    login = async (email, password, res) => {
        try {
            const exists = await userModel.findOne({ email });
            const isValid = isValidPassword(exists, password);
            if(!exists || !isValid){  
                return null
            }else{
                let cartData = await cartServices.createCart()
                let userUpdate = await userModel.updateOne({email: email}, {last_connection: new Date()})
                const tokenUser = {
                name: `${exists.first_name} ${exists.last_name}`,
                email: exists.email,
                role: exists.role,
                cart: exists.carts[0].cart._id,
            };
            const accessToken = generateToken(tokenUser);
            //Cookies
            res.cookie('jwtCookieToken', accessToken, {
                maxAge: 60000,  
                httpOnly: true, // no expone la cookie cuando esta en true
            })  
            return true
            }           
        } catch (error) {
            throw new Error("Error al validar usuario" + error.message);
        }
    };


    logout = async (cookieName, res) => {
        res.clearCookie(cookieName);
        return res.send({ message: 'Logout exitoso' });
    };
    
    gitHubLogin = async (user, res) => {
        let cartData = await cartServices.getCartById(user.carts[0].cart._id)
        const tokenUser = {
            name: `${user.first_name}`,
            email: user.email,
            role: user.role,
            cart: user.carts[0].cart._id,
            cartLength: cartData.products.length
        };
        const accessToken = generateToken(tokenUser)
        res.cookie('jwtCookieToken', accessToken, {
            maxAge: 60000,  
            httpOnly: true,
        })
    
        res.redirect('/users');
    };


    loginShowProducts = async (page, req ,res) => {
        let result = await productModel.paginate({}, {page, lean: true });
            let prevLink = result.hasPrevPage ? `http://localhost:${PORT}/users?page=${result.prevPage}` : '';
            let nextLink = result.hasNextPage ? `http://localhost:${PORT}/users?page=${result.nextPage}` : '';
            let isValid = !(result.page <= 0 || result.page > result.totalPages)
    
            return res.render('profile', {user: req.user,  result, prevLink, nextLink, isValid })            
    };

    loginAdmin = async (req, res) => {
        let isAdmin = true
        return res.render('profile', {user: req.user, isAdmin})            
    };

    updateUser = async (id, user) => {
        let result = await userModel.updateOne(id, user);
        if (result){
            return result;
        }
        else{
            return null
        }
    };

    findById = async (id) => {
        let result = await userModel.findOne(id );
        return result;
    };

    deleteUser = async (id) => {
        let result = await userModel.deleteOne(id);
        if (result){
            return result;
        }
        else{
            return null
        }
    };

    getAllInactive = async () => {
        const fechaActual = new Date();
        const users = await userModel.find();
        const usersInactive = users.filter(user => {
            const fechaUltimaConexion = new Date(user.last_connection);
            const diff = fechaActual - fechaUltimaConexion;
            const minutos = Math.floor(diff / (1000 * 60));
            return minutos > 2880;
        })
        /* return usersInactive; */
        const result = await userModel.deleteMany({_id: {$in: usersInactive.map(user => user._id)}});
        if (result){
            return result;
        }
        else{
            return null
        }
    }

}