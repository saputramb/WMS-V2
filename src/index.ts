import express, { Application, NextFunction, Request, Response } from 'express';
import http, { Server } from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import * as config from "./config/config";
import router from "./api/routes";
import responseHandler from "./api/helpers/response-handler";
import errorHandler from "./api/helpers/error-handler";
import helmet from "helmet";

const volleyball = require("volleyball");

const app: Application = express();

// Set Cors Policy
const whitelist: string[] = ['http://localhost:3000', 'http://localhost:5000'];
const corsOptions: CorsOptions = {
    origin: (origin: string, callback: (err: Error | null, allowed: boolean) => void) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
};

// Middleware Server
app.use(helmet({ contentSecurityPolicy: true, xPoweredBy: true }));
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(volleyball);

// Response Handler
app.use(responseHandler.helper());

// API Routes
app.use('/api', router());

// Redirect to Login
app.get('/', async (req: Request, res: Response): Promise<any> => {
    console.log('redirect example');
    // res.redirect('http://localhost:3000/...');
});

// Unknown Route Error Handler
app.all('*', errorHandler.helper());


// Create Server
const server: Server = http.createServer(app);
try {
    server.listen(config.PORT_SERVER, () => {
        console.log(`Server listening to port ${config.PORT_SERVER}`);
    });
} catch (error) {
    console.log(`Error occurred: ${error.message}`);
}
