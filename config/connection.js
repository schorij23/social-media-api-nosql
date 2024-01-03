const { connect, connection } = require('mongoose');

// Defines the MongoDB connection string and then connects
const connectionString = 'mongodb://127.0.0.1:27017/socialMediaDB';

connect(connectionString);
// Export the Mongoose connection object for use in other parts of the application
module.exports = connection;