// testDbConnection.js
require('dotenv').config()
const connectToDatabase = require('../../src/config/db');  // Adjust the path if necessary

// Test the connection to the database
const testDatabaseConnection = async () => {
  try {
    const db = await connectToDatabase();
    console.log('Database connection established successfully!');

    // Simulate app running for a while
    setTimeout(() => {
      console.log('Simulating application shutdown...');
      process.kill(process.pid, 'SIGINT');  // Simulate SIGINT (Ctrl+C) to test disconnection
    }, 5000);  // Wait 5 seconds before triggering shutdown
  } catch (err) {
    console.log('Error during database connection:', err);
  }
};

testDatabaseConnection();
