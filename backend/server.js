const app = require('./app');
const connectDatabase = require('./database/database');

// Handling uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
});

//config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'backend/config/.env',
  });
}

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// database connection
connectDatabase();

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Shutting down the sesrver for ${err.message}`);
  console.log(`shutting down the server due to unhandle promise rejection`);

  server.close(() => process.exit(1));
});