import { TicketModel } from "./models/ticketModel.js";


export default class TicketServices {

    create = async (data) => {
        console.log(data);
        const ticket = await TicketModel.create(data);
        return ticket;
    }
}