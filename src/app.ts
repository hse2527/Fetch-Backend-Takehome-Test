/**
 * App file that takes care of routers and middleware
 *
 * Author:  Seok-Hee Han
 */
import * as express from 'express';
import pointsRouter from './router/points';

const app: express.Application = express();

app.use(express.json());

app.use('/', pointsRouter);

export default app;
