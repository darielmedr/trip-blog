import express from 'express';
import config from 'config';
import cors from 'cors';
import log from './logger';
import dbConnect from './db/connect';
import routes from './routes';
import { deserializeUser } from './middlewares';


/**
 * Variables
 */
const port: number = parseInt(<string>process.env.API_HOST) || config.get("server.port") as number;
const host: string = process.env.API_HOST || config.get("server.host") as string;

const app = express();


/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// customs
app.use(deserializeUser);



/**
 * Server activation
 */
app.listen(port, host, () => {
    log.info(`Server listening on http://${host}:${port}`);

    dbConnect();

    routes(app);
})