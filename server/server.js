const express = require('express');
const config = require('./config.json')

const cors = require('cors');

const app = express();

app.use(cors());

const lib = require('./routes');


app.use(express.urlencoded({
  extended: true,
}));

let db;

// Start server and connect to the DB
app.listen(config.server_port, async () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});


// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our Baseball API' });
});


module.exports = app;

