const express = require('express');
require('dotenv').config();
const http = require('http');
const db = require('./models/index');
const { testConnection, handleExit } = require('./config/database');

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

/**
  * a function to handle the shutdown 
*/
const gracefulShutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  await handleExit(db);
  server.close((err) => {
    if (err) {
        console.error('Error during server shutdown:', err);
        process.exit(1);
    }
    console.log('Server closed');
    process.exit(0);
  });
};
/**
  * start the server and connect to the database
*/
const startServer = async () => {
  try {
    // Establish the database connection
    await testConnection(db);

    // Start the server
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
