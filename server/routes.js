const mysql = require('mysql2/promise');
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

// get player by id
const getPlayer = async (db, id) => {
  try {
    const query = 'SELECT * FROM Player WHERE ID = ?';
    const params = [id];
    const row = await db.execute(query, params);
    return row[0];
  } catch (err) {
    throw new Error('Error executing the query');
  }
};

// get statistics between a pitcher and batter
const headToHeadPlayers = async (db, batter_id, pitcher_id) => {
  try {
      const query = `
          SELECT Event.EventType AS Outcome, COUNT(*) AS Occurrences
          FROM Event
          WHERE Event.Batter = ?
          AND Event.Pitcher = ?
          GROUP BY Event.EventType;`
      const params = [batter_id, pitcher_id];
      const row = await db.execute(query, params);
      return row[0];
    } catch (err) {
      console.log(err);
      throw new Error('Error executing the query');
  }
};

// get team home and away wins
const teamWins = async (db) => {
  try {
      const query = `
        WITH Teams AS (
          SELECT DISTINCT(NAME),TeamID FROM TeamName WHERE YEAR>=2011 AND YEAR<=2015 ORDER BY TeamID
          ),
          Home AS (SELECT DISTINCT(Teams.TeamID), Teams.Name, COUNT(*) AS wins
          FROM Teams
          JOIN Game
          ON Game.HomeTeam = Teams.TeamID
          WHERE Game.HomeScore > Game.AwayScore
          GROUP BY Teams.Name),
          Away AS (SELECT DISTINCT(Teams.TeamID), Teams.Name, COUNT(*) AS wins
          FROM Teams
          JOIN Game
          ON Game.AwayTeam = Teams.TeamID
          WHERE Game.HomeScore < Game.AwayScore
          GROUP BY Teams.Name)
        SELECT Home.Name AS TeamName, Home.wins AS HomeWins, Away.wins AS AwayWins
        FROM Home
              JOIN Away ON Home.Name = Away.Name;`
      const row = await db.execute(query);
      return row[0];
    } catch (err) {
      console.log(err);
      throw new Error('Error executing the query');
  }
};

module.exports = {
  connect, getPlayer, headToHeadPlayers, teamWins
};