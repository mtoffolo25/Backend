import dotenv from 'dotenv';
import { Command } from "commander";

const program = new Command();

program
    .option ('-d', "variable de debug", false)
    .option ('-p <PORT>', "variable de puerto", 8080)
    .option ('--mode <mode>', "Modo de trabajo", "prod")
    .option ('-u <user>', 'Usuario que va a utilizar la app', 'No se declaro ningun usuario')
    .option ('--persist <mode>', 'persistencia de datos', 'mongo')
    program.parse();

const enviroment = program.opts().mode

console.log("Modo Opt: ", program.opts().mode);
console.log("Persistencia Opt: ", program.opts().persist);

dotenv.config({
    path: enviroment === "prod" ? "./src/config/.env.production" : "./src/config/.env.development"
});



export default {
    enviroment: enviroment,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence : program.opts().persist,
    gitHubClientId: process.env.GITHUB_CLIENT_ID,
    gitHubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    gitHubCallbackUrl: process.env.GITHUB_CALLBACK_URL,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    gmailUser: process.env.GMAIL_USER,
    gmailPass: process.env.GMAIL_PASS,
};