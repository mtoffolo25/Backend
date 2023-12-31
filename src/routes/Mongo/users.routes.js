import { Router } from 'express';
import {registerController, loginController, logoutController, gitHubCallbackController, getAllUsersController, updateUserController, findOneUserController, deleteUserController, imgProfileController,delAllInactiveUsersController} from "../../controllers/user.controller.js";
import passport from 'passport';
import { upProdImg, upProfileImg, upUserDocs } from '../../utils.js';



const router = Router();


//Registramos al usuario en la base de datos MongoDB
router.post("/register", registerController );

//Actualizamos un usuario en la base de datos MongoDB
router.put('/update/:uid', updateUserController)

//Buscamos un usuario en la base de datos MongoDB
router.get('/findOne/:uid', findOneUserController)

//Eliminar un usuario de la base de datos MongoDB
router.delete('/deleteOne/:uid', deleteUserController)

//Obtenemos todos los usuarios de la base de datos MongoDB
router.get('/allUsers', getAllUsersController )

//Obtenemos todos los usuarios inactivos de la base de datos MongoDB
router.delete('/inactiveUsers', delAllInactiveUsersController )

//Logueamos al usuario en la base de datos MongoDB
router.post('/login', loginController)

//Deslogueamos al usuario de la base de datos MongoDB
router.get('/logout', logoutController)

//subir img de perfil
router.post('/uploadAvatar/:user', upProfileImg.single('file'), imgProfileController)



//Logueo con GitHUb
router.get('/github', passport.authenticate('github', {scope: ['user:email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/github/error'}),gitHubCallbackController)

router.get('/error', (req, res) => {
    res.render('error', {error: "No se pudo autenticar el usuario usando GitHub"})
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ status: "error", message: "Error al registrar el usuario" })
})
router.get("/fail-login", (req, res) => {
    res.status(401).send({ status: "error", message: "Error al loguear el usuario" })
})


//Acceso a ruta privada
router.get('/private/:role', auth, (req, res) =>{
    res.render('admin')
});

//Acceso a ruta premium
router.get('/premium/:uid', )

//autenticación
function auth(req, res, next){
    const role = req.params.role;
    if (role === "admin") {
        return next();
    } else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
    
}



export default router;