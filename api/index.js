require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Database connection pool
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  port            : process.env.DB_PORT,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_DATABASE
});
module.exports.connectionDB = pool;

// Create express instance
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Require API routes
//const users = require('./routes/users');
//const test = require('./routes/test');

//const messages = require('./routes/messages');

const accounts = require('./routes/accounts');
const channels = require('./routes/channels');
const registrationInvitations = require('./routes/registrationInvitations');
const messages = require('./routes/messages');

// Import API Routes
//app.use(users);
//app.use(test);
app.use(accounts);
app.use(channels);
app.use(registrationInvitations);
app.use(messages);

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}


