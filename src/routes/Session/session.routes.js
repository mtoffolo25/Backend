import { Router } from 'express';
import {registerController, loginController, logoutController, gitHubCallbackController} from "../../controllers/user.controller.js";
import passport from 'passport';



const sessionRouter = Router();

//Registramos al usuario en la base de datos MongoDB
sessionRouter.post("/register", registerController );

sessionRouter.post('/login', loginController)

sessionRouter.get('/logout', logoutController)

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}))

sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/github/error'}),gitHubCallbackController)

sessionRouter.get('/error', (req, res) => {
    res.render('error', {error: "No se pudo autenticar el usuario usando GitHub"})
});

sessionRouter.get("/fail-register", (req, res) => {
    res.status(401).send({ status: "error", message: "Error al registrar el usuario" })
})
sessionRouter.get("/fail-login", (req, res) => {
    res.status(401).send({ status: "error", message: "Error al loguear el usuario" })
})



sessionRouter.get('/private/:role', auth, (req, res) =>{
    res.render('admin')
});

//autenticación
function auth(req, res, next){
    const role = req.params.role;
    if (role === "admin") {
        return next();
    } else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
    
}



export default sessionRouter;