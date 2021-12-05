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

app.get('/player/:id', async (req, res) => {
    try {
      if (req.params.id === undefined) {
        res.status(404).json({ error: 'id is missing' });
        return;
      }
      const result = await lib.getPlayer(db, req.params.id);
      if (result === undefined) {
        res.status(404).json({ error: 'bad user id' });
        return;
      }
      res.status(200).json({ result });
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
        res.status(200).json({ result });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.get('/teams/wins', async (req, res) => {
    try {
        const result = await lib.teamWins(db);
        res.status(200).json({ result });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.get('/head2head/teams/games/:teamOne/:teamTwo', async (req, res) => {
    try {
        if (req.params.teamOne === undefined) {
            res.status(404).json({ error: 'team 1 is missing' });
            return;
        }
        if (req.params.teamTwo === undefined) {
            res.status(404).json({ error: 'team2 is missing' });
            return;
        }
        const result = await lib.getGameDates(db, req.params.teamOne, req.params.teamTwo);
        res.status(200).json({result});
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

app.get('/head2head/teams/:teamOne/:teamTwo', async (req, res) => {
    try {
        if (req.params.teamOne === undefined) {
            res.status(404).json({ error: 'team 1 is missing' });
            return;
        }
        if (req.params.teamTwo === undefined) {
            res.status(404).json({ error: 'team2 is missing' });
            return;
        }
        const result = await lib.getSnapShotTeams(db, req.params.teamOne, req.params.teamTwo, req.query.field);
        res.status(200).json({result});
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

app.get('/head2head/teams/pitchers/:teamOne/:teamTwo', async (req, res) => {
    try {
        if (req.params.teamOne === undefined) {
            res.status(404).json({ error: 'team 1 is missing' });
            return;
        }
        if (req.params.teamTwo === undefined) {
            res.status(404).json({ error: 'team2 is missing' });
            return;
        }
        const result = await lib.getPitchingLeadersTeams(db, req.params.teamOne, req.params.teamTwo, req.query.field);
        res.status(200).json({result});
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})
/*
app.get('/head2head/teams/batters/:teamOne/:teamTwo', async (req, res) => {
    try {
        if (req.params.teamOne === undefined) {
            res.status(404).json({ error: 'team 1 is missing' });
            return;
        }
        if (req.params.teamTwo === undefined) {
            res.status(404).json({ error: 'team2 is missing' });
            return;
        }
        const result = await lib.getBattingLeadersTeams(db, req.params.teamOne, req.params.teamTwo, req.query.at_bats);
        res.status(200).json({result});
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})
*/

/*this endpoint takes an optional query param "year" */
app.get('/teams/:teamId', async (req, res) => {
    try {
        if (req.params.teamId === undefined) {
            res.status(404).json({ error: 'Team Id is missing' });
            return;
        }

        const result = await lib.getTeamByIdAndYear(db, req.params.teamId, req.query.year);
        res.status(200).json({result});
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

/*this endpoint takes an optional query param "year" */
app.get('/teams/season/leaderboard', async (req, res) => {
    try {

        const result = await lib.getLeaderboardBySeason(db, req.query.year, req.query.pagesize);
        res.status(200).json({result});
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

// this endpoint is used to fetch player-specific statistics

app.get('/player/stats/:id', async(req, res) => {
    try {

        if (req.params.id === undefined) {
            res.status(404).json({ error: 'Player ID is not passed or invalid' });
            return;
        }

        const result = await lib.getPlayerStats(db, req.params.id, req.query.dateStart, req.query.dateEnd,
            req.query.againstTeams, req.query.forTeams)
        res.status(200).json({result})

    } catch (err) {
        res.status(404).json({error: err.message});
    }

})

app.get('/api/game/:id', async (req, res) => {
    try {
        if (req.params.id === undefined) {
            res.status(404).json({ error: 'Invalid or Missing GameID' });
            return;
        }

        const result = await lib.getGame(db, req.params.id)
        res.status(200).json({ result })
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

module.exports = app;

