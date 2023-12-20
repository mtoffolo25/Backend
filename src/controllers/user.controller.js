import { userService } from "../services/factory.js";

// controller registro por formulario
export  const  registerController = async (req, res) => {
    const { first_name, last_name, email, age, password} = req.body;
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    };
    const result = await userService.save(user, res);
    if (result) {
        req.logger.info("Usuario logueado con exito")
        return res.send({ status: "200", message: "Usuario creado con exito con ID: " + result.id, payload: result});
    }else{
        req.logger.error("Se intenta crear un usuario con email ya registrado en DB")
        return res.status(401).send({ message: "Email ya registrado en la DB" });
    }
};

//Controller para obtener todos los usuarios
export const getAllUsersController = async (req, res) => {
    const data = await userService.getAll();
    res.send(data);
};

//Controller para obtener todos los usuarios inactivos
export const delAllInactiveUsersController = async (req, res) => {
    const data = await userService.deleteAllInactive();
    res.send(data);
}

//controller para encontrar un usuario por id
export const findOneUserController = async (req, res) => {
    const uid = req.params.uid;
    try {
        const user = await userService.findById({_id:uid})
        if (user) {
            req.logger.info("Usuario encontrado con exito")
            return res.send({status: "200", message: "Usuario encontrado con exito", payload: user});
        }else{
            req.logger.error("Error al buscar el usuario")
            return res.status(401).send({ message: "Usuario no valido" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });    
    };
};

//Controller para eliminar un usuario por id
export const deleteUserController = async (req, res) => {
    const uid = req.params.uid;
    try {
        const user = await userService.deleteUser({_id:uid})
        if (user) {
            req.logger.info("Usuario eliminado con exito")
            return res.send({status: "200", message: "Usuario eliminado con exito", payload: user});
        }else{
            req.logger.error("Error al buscar el usuario")
            return res.status(401).send({ message: "Usuario no valido" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });  
        
    }
}


//controller para actualizar un usuario
export const updateUserController = async (req, res) => {
    const uid = req.params.uid;
    try {
        const {first_name, last_name, email, age, role, last_connection, documents} = req.body;
        const data = {
            first_name,
            last_name,
            email,
            age,
            role,
            last_connection,
            documents
        }
        const user = await userService.updateUser({_id: uid}, data);
        if (user) {
            req.logger.info("Usuario actualizado con exito")
            return res.send({status: "200", message: "Usuario actualizado con exito", payload: user});
        }else{
            req.logger.error("Error al actualizar el usuario")
            return res.status(401).send({ message: "Usuario no valido" });
        }

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
    

}

//controler login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password, res);

        if (user) {
            req.logger.info("Usuario logueado con éxito");
            res.status(200).json({ message: "Inicio de sesión exitoso" });
        } else {
            req.logger.error("Usuario no válido, Usuario o contraseña incorrectos");
            res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        req.logger.error("Error interno del servidor:", error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

//controller subir img de perfil
export const imgProfileController = async (req, res) => {
    let email = req.params.user;
    let path = "../profile/"+(req.file.filename)
    
    const user = await userService.uploadAvatar(email, path);
    if (user) {
        req.logger.info("Imagen de perfil subida con exito")
        return res.status(200).send({ message: "Imagen de perfil subida con exito" }); 
    }
    req.logger.error("Error al subir la imagen de perfil")
}

export const logAuthenticate = async (req, res) => {
    let page = parseInt(req.query.page);
    if(req.user.role === 'admin'){
        await userService.loginAdmin(req, res)
    }else{
        if (!page) page = 1;
        await userService.loginShowProducts(page, req, res)
    }
};

//controler login github
export const gitHubCallbackController = async (req, res) => {
    const user = req.user;
    await userService.gitHubLogin(user, res);
}

//controler logout
export const logoutController = async (req, res) => {
    await userService.logout('jwtCookieToken', res);   
}