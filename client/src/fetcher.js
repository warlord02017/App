import config from './config.json'
const axios = require('axios');

async function getTeams() {
    const url = `http://${config.server_host}:${config.server_port}/teams`;
    const response = await axios.get(url);
    return response.data;
}

async function geth2hteams(team1, team2, field) {
    team1 = team1.split(' ').join('-');
    team2 = team2.split(' ').join('-');
    if (field === undefined){
        field = "";
    }
    const url = `http://${config.server_host}:${config.server_port}/head2head/teams/${team1}/${team2}?field=${field}`;
    const response = await axios.get(url);
    return response.data;
}

async function getGames(team1, team2) {
    team1 = team1.split(' ').join('-');
    team2 = team2.split(' ').join('-');
    const url = `http://${config.server_host}:${config.server_port}/head2head/teams/games/${team1}/${team2}`
    const response = await axios.get(url);
    return response.data;
}

async function getPitchingLeadersTeam(team1, team2) {
    team1 = team1.split(' ').join('-');
    team2 = team2.split(' ').join('-');
    const url = `http://${config.server_host}:${config.server_port}/head2head/teams/pitchers/${team1}/${team2}`;
    const response = await axios.get(url);
    return response.data;
}

async function getBattingLeadersTeam(team1, team2) {
    team1 = team1.split(' ').join('-');
    team2 = team2.split(' ').join('-');
    const url = `http://${config.server_host}:${config.server_port}/head2head/teams/batters/${team1}/${team2}`;
    const response = await axios.get(url);
    return response.data;
}

/*
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
*/

const getLeaderboard = async (year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/teams/season/leaderboard?year=${year}`, {
        method: 'GET',
    })
    return res.json()
}













export {
//     getAllMatches,
//     getAllPlayers,
//     getMatch,
//     getPlayer,
//     getMatchSearch,
//     getPlayerSearch
getLeaderboard,
getTeams,
geth2hteams,
getGames,
getPitchingLeadersTeam,
getBattingLeadersTeam,
 }