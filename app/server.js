import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';

export default function() {
    const server = express();
    server.use(bodyParser.json());
    server.use(routes);

    server.listen(4000, console.info(`started at port: 4000`));
}
