import { Router } from "express";
import passport from "passport";
import {logAuthenticate} from '../../controllers/user.controller.js'

const userViewRouter = Router();

userViewRouter.get("/login", (req, res) => {
    res.render('login')
});

userViewRouter.get("/register", (req, res) => {
    res.render('register')
});

userViewRouter.get("/", passport.authenticate('jwt', { session: true}), logAuthenticate);


export default userViewRouter;