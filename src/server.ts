/**
 * Server file for Fetch Rewards take home assessment
 */
import app from './app';
const PORT = 8000;

// listen to port
app.listen(PORT, () => {
  console.log(`Fetch App listening on port http://localhost/${PORT}!`);
});
