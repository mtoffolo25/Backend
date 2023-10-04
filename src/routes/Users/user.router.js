router.get('/private/:role', auth, (req, res) =>{
    res.send("Si estas viendo esto es porque pasaste la autorización a este recurso!");
});

//autenticación
function auth(req, res, next){
    const role = req.params.role;
    console.log("el req.user del aut para ver si es admin es: ", role);
    if (role === "admin") {
        return next();
    } else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
    
}