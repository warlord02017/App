import config from './config.json'

const base_url = `http://${config.server_host}:${config.server_port}`

const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

/**
 * Get the summary details of a game.
 * @param {int} gameId
 * @returns {
 *  result: {
 *      ID,Park,City,HomeTeam,AwayTeam,Date,Attendance,Duration,Innings,Outs,HomeScore,AwayScore,HomeHits,AwayHits,HomeErr,AwayErr,HomeLob,AwayLob
 * }}
 */
const getGame = async (gameId) => {
    var res = await fetch(`${base_url}/api/game/${gameId}`, {
        method: 'GET',
    })
    return res.json
}

/**
 * Get play by play details of a game.
 * @param {int} gameId
 * @returns {
 *  result: {[
 *      {EventID,HomeScore,AwayScore,BatterID,Batter,PitcherID,Pitcher,Strikes,Ball,Outs,Inning,EventType,Comment}
 *  ]}}
 */
const getPlay = async (gameId) => {
    var res = await fetch(`${base_url}/api/play/${gameId}`, {
        method: 'GET',
    })
    return res.json
}









export {
    getAllMatches,
    getAllPlayers,
    getMatch,
    getPlayer,
    getMatchSearch,
    getGame,
    getPlay,
    getPlayerSearch
}