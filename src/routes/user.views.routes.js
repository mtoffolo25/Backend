import { Router } from "express";

const userViewRouter = Router();

userViewRouter.get("/login", (req, res) => {
    res.render('login')
});

userViewRouter.get("/register", (req, res) => {
    res.render('register')
});

userViewRouter.get("/", (req, res) => {
    res.render("profile", {
        user: req.session.user
    });
});

userViewRouter.get("/error", (req, res) => {
    res.render("error");
});

export default userViewRouter;