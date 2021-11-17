const mysql = require('mysql');
const config = require('./config.json');

// Connect to our db on the cloud
const connect = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.rds_host,
      user: config.rds_user,
      password: config.rds_password,
      port: config.rds_port,
      database: config.rds_db,
    });
      // Connected to db
    console.log('Connected to database');
    return connection;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

module.exports = {
    connect
  };