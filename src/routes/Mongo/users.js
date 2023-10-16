import { Router } from 'express';
import {registerController, loginController, logoutController, gitHubCallbackController} from "../../controllers/user.controller.js";
import passport from 'passport';



const userRouter = Router();

userRouter.post("/register", registerController );

userRouter.post('/login', loginController)

userRouter.get('/logout', logoutController)

userRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}))

userRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/github/error'}),gitHubCallbackController)

userRouter.get('/error', (req, res) => {
    res.render('error', {error: "No se pudo autenticar el usuario usando GitHub"})
});

userRouter.get("/fail-register", (req, res) => {
    res.status(401).send({ status: "error", message: "Error al registrar el usuario" })
})
userRouter.get("/fail-login", (req, res) => {
    res.status(401).send({ status: "error", message: "Error al loguear el usuario" })
})



userRouter.get('/private/:role', auth, (req, res) =>{
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



export default userRouter;