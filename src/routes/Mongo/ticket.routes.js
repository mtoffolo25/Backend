import { Router } from "express";
import { createTicket } from "../../controllers/ticket.controller.js";

const ticketRouter = Router();

ticketRouter.post("/create", createTicket);

export default ticketRouter;