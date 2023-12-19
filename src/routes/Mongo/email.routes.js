import { Router } from "express";
import { emailSend } from "../../controllers/email.controller.js";


const router = Router()

router.get('/send', emailSend)


export default router;