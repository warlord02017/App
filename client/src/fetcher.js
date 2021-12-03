import config from './config.json'
const axios = require('axios');

async function getLeaderboard(year) {
    const url = `http://${config.server_host}:${config.server_port}/teams/season/leaderboard?year=${year}`;
    const response = await axios.get(url);
    return response.data;
}

async function getTeamByIdAndYear(teamId, year) {
    const url = `http://${config.server_host}:${config.server_port}/teams/${teamId}?year=${year}`;
    const response = await axios.get(url);
    return response.data;
}



export {
getLeaderboard, getTeamByIdAndYear
 }