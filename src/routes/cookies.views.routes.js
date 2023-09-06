import {Router} from 'express';
import cookieParser from 'cookie-parser';

const cookiesRouter = Router();

cookiesRouter.use(cookieParser("CoderS3cr3tC0d3"));

cookiesRouter.get('/',(req,res)=>{
    res.render('index',{})
});

cookiesRouter.get("/session", (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado este sitio ${req.session.counter} veces.`);
    } else {
        req.session.counter = 1;
        res.send("Bienvenido!");
    }
});

cookiesRouter.get('/login', (req, res) => {
    const {email, password} = req.query;
    if (email !== 'maxi_toffolo@hotmail.com' || password !== '1234'){
        return res.status(401).send("Login Failed, check your username and password.");
    } else {
        req.session.user = username;
        req.session.admin = true;
        res.send('Login Successful !');
    }
});

cookiesRouter.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error){
            res.json({error: "error logout", mensaje: "Error al cerrar la sesion"});
        }
        res.send("Sesion cerrada correctamente.");
    });
});

function auth(req, res, next){
    if (req.session.user === 'Maxi' && req.session.admin) {
        return next();
    } else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
    
}

cookiesRouter.get('/private', auth, (req, res) =>{
    res.send("Si estas viendo esto es porque pasaste la autorización a este recurso!");
});

export default cookiesRouter;