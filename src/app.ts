/**
 * App file that takes care of routers and middleware
 * 
 * Author:  Seok-Hee Han
 */
import * as express from 'express';
import pointsRouter from './router/points';

let points: number = 0;
const transactions: any[] = [];
const payers: any = {};

const app: express.Application = express();

app.use(express.json());

app.use('/', pointsRouter);

export default app;