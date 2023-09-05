import express, { urlencoded } from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import http from 'http';
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;
const MONGO_URL = "mongodb+srv://maxitoffolo:Mt40685691@allcomputers.21ghxhd.mongodb.net/?retryWrites=true&w=majority"; 

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/', router);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export function getIO() {
    return io;
}

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10
    }),


    secret: "coderS3cr3t",
    resave: false,
    saveUninitialized: true
}));

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();