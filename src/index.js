import express from 'express';
import productRouter from './router/products.routes.js';
import cartsRouter from './router/carts.routes.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewProducts from './router/viewProducts.router.js'
import { Server} from 'socket.io';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/carts', cartsRouter)
app.use('/api/products', productRouter)

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/public"));

app.use('/', viewProducts);

const httpServer = app.listen( PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
})

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado!!");

    socket.on("mensajeKey", data => {
        console.log(data);
    })

    socket.emit('msg_02', "Mensaje desde el back!!")

    socket.broadcast.emit("evento_para_todos_excepto_socket_actual", "Este evento es para todos los sockets, menos el socket desde que se emitió el mensaje!")


    socketServer.emit("evento_para_todos", "Evento para todos los Sockets!");

})