const { connect, connection} = require('mongoose');

connect('mongodb://127.0.0.1:2707/test ');

module.exports = connection;