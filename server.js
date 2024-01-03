
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const cwd = process.cwd();
// Define the port on which the API server will run
const PORT = 3001;
// Create an Express application
const app = express();
// Middleware for parsing JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the defined routes for handling API endpoints
app.use(routes);

// When the database connection is open, start the API server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});