const express = require('express');
const config = require('./config.json')

const cors = require('cors');

const app = express();

app.use(cors());

const lib = require('./routes');


app.use(express.urlencoded({
  extended: true,
}));

// declare DB connection handle
let db;

// Start server and connect to the DB
app.listen(config.server_port, async () => {
    db = await lib.connect();
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});


// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our Baseball API' });
});

app.get('/player', async (req, res) => {
    try {
      if (req.query.id === undefined) {
        res.status(404).json({ error: 'id is missing' });
        return;
      }
      const result = await lib.getPlayer(db, req.query.id);
      if (result === undefined) {
        res.status(404).json({ error: 'bad user id' });
        return;
      }
      res.status(200).json({ data: result });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
});

app.get('/head2head/players', async (req, res) => {
    try {
        if (req.query.batter === undefined || req.query.pitcher === undefined) {
            res.status(404).json({ error: 'batter or pitcher id is missing' });
            return;
        }
        const result = await lib.headToHeadPlayers(db, req.query.batter, req.query.pitcher);
        if (result === undefined) {
            res.status(404).json({ error: 'bad ids' });
            return;
        }
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.get('/teams/wins', async (req, res) => {
    try {
        const result = await lib.teamWins(db);
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

module.exports = app;

