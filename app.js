/**
 * App file that takes care of routers and middleware
 * 
 * Author:  Seok-Hee Han
 */
const express = require('express');
const app = express();
const pointsRouter = require('./router/points');

let points = 0;
const transactions = [];
const payers = {};

app.use(express.json());

app.use('/', pointsRouter);

module.exports = app;