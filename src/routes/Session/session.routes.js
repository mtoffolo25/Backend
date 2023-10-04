import { Router } from "express";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });


sessionRouter.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/users");
});


sessionRouter.post("/register", passport.authenticate(
    'register', { failureRedirect: '/fail-register' })
    , async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });

sessionRouter.post("/login", passport.authenticate(
    'login', { failureRedirect: '/fail-login' })
    , async (req, res) => {
        console.log("User found to login:");
        const user = req.user;
        console.log(user);
        if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        };
        req.session.admin = true;
        res.send({ status: "success", payload: req.session.user, message: "Primer logueo realizado!! :)" })
    });

sessionRouter.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

sessionRouter.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

export default sessionRouter;