import mongoose from 'mongoose';
import config from 'config';
import log from '../logger';

const connect = () => {
    const dbUri: string = process.env.DB_URI || config.get("server.dbUri") as string;

    return mongoose
        .connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => log.info("Database is connected"))
        .catch((error: string) => {
            log.error(`${error}`);
            process.exit(1);
        });
};

export default connect;