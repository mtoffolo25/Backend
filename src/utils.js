import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import multer from 'multer';
import envCongif from './config/env.config.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password)
}

//Configuracion de Multer para subir archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${__dirname}/public/img`)},

        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }
    });    
export const uploader = multer({storage, onError: function(err, next) {
    console.log(err);
    next();
    }
});

export const PRIVATE_KEY = envCongif.jwtPrivateKey;

export const generateToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '60s'})
};

export const authToken = (req, res, next) => {
    //el JWT de autorizacion se guarda en el header de la peticion
    const authHeader = req.headers.authorization;
    if (!authHeader){ 
        return res.status(401).send({error: 'User not authenticated or missing token'})
    };
    const token = authHeader.split(' ')[1]; 
    
    //validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({error: 'Invalid token, access denied'});
        req.user = credentials.user;
        next();
    });
};


export default __dirname;