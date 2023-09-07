import { Router } from "express";
import userModel from "../services/db/models/user.js";

const sessionRouter = Router();

sessionRouter.post('/register', async (req, res) => {
    const { firt_name, last_name, email, age, password } = req.body;
    const exist = await userModel.findOne({ email });

    if (exist) {
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    }

    const user = {
        firt_name,
        last_name,
        email,
        age,
        password
    }

    const result = await userModel.create(user);
    res.send({ status: "success", message: "Usuario creado con exito con ID: " + result.id })
})

sessionRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email, password});

    if(!user) return res.status(401).send({ status: "error", error: "Incorrect credentials" });

    res.send({ status: "success", payload: user, message: "¡Primer logueo realizado! :)" });

})

export default sessionRouter;