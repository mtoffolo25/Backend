import { transporter } from "../utils.js";
import envConfig from "../config/env.config.js";

export const emailSend = async (req, res) => {
    let result = await transporter.sendMail({
        from: envConfig.gmailUser,
        to: envConfig.gmailUser,
        subject: `Prueba`,
        html: `<div>
        <h1>Compra realizada</h1>
        </div>`
    })
    res.render('email', result)
}