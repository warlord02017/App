import config from './config.json'
const axios = require('axios');

async function getTeams() {
    const url = `http://${config.server_host}:${config.server_port}/teams`;
    const response = await axios.get(url);
    return response.data;
}

async function getPitchers() {
    const url = `http://${config.server_host}:${config.server_port}/pitchers`;
    const response = await axios.get(url);
    return response.data;
}

async function getBatters() {
    const url = `http://${config.server_host}:${config.server_port}/batters`;
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

async function geth2hPlayers(pit, bat) {
    const url =  `http://${config.server_host}:${config.server_port}/head2head/players/?pitcher=${pit}&batter=${bat}`;
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

async function getBatterStats(id, dateStart, dateEnd, againstTeam) {
    if (againstTeam === -1) {
        const url = `http://${config.server_host}:${config.server_port}/player/batstats/${id}?dateStart=${dateStart}&dateEnd=${dateEnd}`;
        const response = await axios.get(url);
        return response.data;
    } else if (againstTeam === undefined) {
        const url = `http://${config.server_host}:${config.server_port}/player/batstats/${id}?dateStart=${dateStart}&dateEnd=${dateEnd}`;
        const response = await axios.get(url);
        return response.data;
    }
    else {
        const url = `http://${config.server_host}:${config.server_port}/player/batstats/${id}?dateStart=${dateStart}&dateEnd=${dateEnd}&againstTeams=(${againstTeam})`;
        const response = await axios.get(url);
        return response.data;
    }
}

async function getPitcherStats(id, dateStart, dateEnd, againstTeam) {
    if (againstTeam === -1) {
        const url = `http://${config.server_host}:${config.server_port}/player/pitchstats/${id}?dateStart=${dateStart}&dateEnd=${dateEnd}`;
        const response = await axios.get(url);
        return response.data;
    } else if (againstTeam === undefined) {
        const url = `http://${config.server_host}:${config.server_port}/player/pitchstats/${id}?dateStart=${dateStart}&dateEnd=${dateEnd}`;
        const response = await axios.get(url);
        return response.data;
    }
    else {
        const url = `http://${config.server_host}:${config.server_port}/player/pitchstats/${id}?dateStart=${dateStart}&dateEnd=${dateEnd}&againstTeams=(${againstTeam})`;
        const response = await axios.get(url);
        return response.data;
    }
}

export {
    getPitchers,
    getBatters,
    getTeamByIdAndYear,
    geth2hPlayers,
    getLeaderboard,
    getTeams,
    geth2hteams,
    getGames,
    getPitchingLeadersTeam,
    getBattingLeadersTeam,
    getBatterStats,
    getPitcherStats,
 }