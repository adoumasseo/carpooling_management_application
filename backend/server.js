const express = require('express');
require('dotenv').config()
const http = require('http');
const connectToDatabase = require('./src/config/db');

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

/**
  * start the server and connect to the database
*/
const startServer = async () => {
  try {
    // Establish the database connection
    const db = await connectToDatabase();
    console.log('🟢 --- Connected to the database successfully. --- 🟢');

    // Start the server
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });

    // Handle graceful shutdown on SIGINT and SIGTERM signals
    process.on('SIGINT', () => {
      console.log('SIGINT received. Closing server...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Closing server...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
