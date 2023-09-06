import { Router } from "express";

const userViewRouter = Router();

userViewRouter.get("/login", (req, res) => {
    res.render('login')
});

userViewRouter.get("/register", (req, res) => {
    res.render('register')
});


export default userViewRouter;