import express from "express";
import router from "./routes/index.js";
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import http from 'http';
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import MongoSingleton from './config/db.js';
import configEnv from './config/env.config.js';
import './config/db.js'

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = configEnv.port;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware para archivos estaticos
app.use(express.static(__dirname + '/public'));

//Config Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Socket
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

//SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl: configEnv.mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 60
    }),
    secret: "coderS3cr3t",
    resave: false,
    saveUninitialized: true
}));

//middeleware para passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use('/', router);

// Conexión Mongo
const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.log(error);
    }
};
mongoInstance();