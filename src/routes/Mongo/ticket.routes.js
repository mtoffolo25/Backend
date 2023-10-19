import { Router } from "express";
import { createTicket, renderTicket } from "../../controllers/ticket.controller.js";

const ticketRouter = Router();

ticketRouter.post("/create", createTicket);

ticketRouter.get("/:tid", renderTicket)

export default ticketRouter;