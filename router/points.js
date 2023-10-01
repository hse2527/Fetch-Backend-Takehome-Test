/**
 * Router for points
 * 
 * author: Seok-Hee Han
 */

const express = require('express');
const app = express();
const router = express.Router();

let points = 0;
const transactions = [];
const payers = {};

app.use(express.json());

// POST: /add - Add points to a user, account transaction, and update points per payer
router.post('/add', (req, res) => {
  const transaction = req.body;
  // Check for valid transaction
  if (transaction === undefined) {
    res.status(400).send('No transaction found');
    return;
  }
  if (transaction.payer === undefined || transaction.points === undefined || transaction.timestamp === undefined) {
    res.status(400).send('Missing required fields');
    return;
  }
  if (typeof transaction.payer !== 'string' || typeof transaction.points !== 'number' || typeof transaction.timestamp !== 'string') {
    res.status(400).send('Invalid data types');
    return;
  }

  // Add transaction to transactions and update points per payer
  transactions.push(transaction);
  if (payers[transaction.payer] === undefined) {
    payers[transaction.payer] = transaction.points;
  } else {
    payers[transaction.payer] += transaction.points;
  }
  points += transaction.points;
  res.status(200).send();
});

// POST: /spend - Spend and return points spent per payer, delete transactions used
router.post('/spend', (req, res) => {
  // Check for valid request
  if (req.body === undefined) {
    res.status(400).send('No points provided');
    return;
  }
  const spent = req.body.points;
  // Check for valid request
  if (spent === undefined) {
    res.status(400).send('No points provided');
    return;
  }
  // Check for valid points
  if (typeof spent !== 'number') {
    res.status(400).send('Invalid data type');
    return;
  }
  if (spent > points) {
    res.status(400).send('Not enough points');
    return;
  }
  const spentPoints = {};
  let remaining = spent;
  let deletedTransactions = 0;
  // Sort transactions by timestamp in ascending order
  transactions.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  // Spend points and update transactions and points per payer
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    // If transaction points are less than remaining points, spend all transaction points and delete transaction
    if (transaction.points <= remaining) {
      remaining -= transaction.points;
      payers[transaction.payer] -= transaction.points;
      deletedTransactions++;

      // Keep track of all points spent per payer
      if (spentPoints[transaction.payer] === undefined) {
        spentPoints[transaction.payer] = 0 - transaction.points;
      } else {
        spentPoints[transaction.payer] -= transaction.points;
      }
    } else { // If transaction points are greater than remaining points, spend remaining points
      payers[transaction.payer] -= remaining;
      transactions[i].points -= remaining;

      // Keep track of all points spent per payer
      if (spentPoints[transaction.payer] === undefined) {
        spentPoints[transaction.payer] = 0 - remaining;
      } else {
        spentPoints[transaction.payer] -= remaining;
      }
      remaining = 0;
    }
    if (remaining === 0) {
      break;
    }
  }
  // Delete transactions used, update points, and return points spent per payer
  transactions.splice(0, deletedTransactions);
  points -= spent;
  res.status(200).send(spentPoints);
});

// GET: /balance - Return points per payer
router.get('/balance', (req, res) => {
  res.status(200).send(payers);
});

module.exports = router;