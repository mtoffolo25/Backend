import winston  from "winston";
import envConfig from "./env.config.js";

//Custom logger options:
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
};

//Logger de Desarrollo
const devLogger = winston.createLogger({

    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './errors.log',
                level: 'error', //Cambiamos el logger level name.
                format: winston.format.simple()
            }
        )
    ]
});

//Logger de producción
const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,

    transports: [
        new winston.transports.Console({ level: "info" }),
        new winston.transports.File({ filename: './errors.log', level: 'error' })
    ]
});

//Middleware:
export const addLogger = (req, res, next) => {
    if (envConfig.enviroment === 'prod') {
        req.logger = prodLogger;
        req.logger.warning("Prueba de log level warn!");
        req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    } else {
        req.logger = devLogger;
        req.logger.warning("Prueba de log level warning!");
        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    }
    next();
};