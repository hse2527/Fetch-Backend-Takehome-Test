/**
 * Server file for Fetch Rewards take home assessment
 */
const app = require('./app');
const PORT = 8000;

// listen to port
app.listen(PORT, () => {
  console.log(`Fetch App listening on port http://localhost/${PORT}!`);
});