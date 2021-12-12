import {useEffect, useState} from 'react';
import '../stylesheets/StatisticLeaders.css';
import {Table} from 'react-bootstrap';

const lib = require('../fetcher.js');


function StatisticLeaders() {
    const [isLoading, setIsLoading] = useState(true);
    const [team1, setTeam1] = useState();
    const [team2, setTeam2] = useState();

    const [batData, setBatData] = useState([]);
    const [topBatters, setTopBatters] = useState(5);
    const [batByPitch, setBatByPitch] = useState();
    const [batByHR, setBatByHR] = useState();
    const [batByBA, setBatByBA] = useState();

    function sortByPitch(arr) {
        arr.sort((a, b) => a.walks > b.walks ? -1 : 1);
        return arr;
    }

    function sortByHR(arr) {
        arr.sort((a, b) => a.homeruns > b.homeruns ? -1 : 1);
        return arr;
    }

    function sortByBA(arr) {
        arr.sort((a, b) => a.batting_avg > b.batting_avg ? -1 : 1);
        return arr;
    }

    const [pitchData, setPitchData] = useState([]);
    const [topPitchers, setTopPitchers] = useState(5);
    const [pitchByBat, setPitchByBat] = useState();
    const [pitchBySO, setPitchBySO] = useState();
    const [pitchBySR, setPitchBySR] = useState();

    function sortByBattersFaced(arr) {
        arr.sort((a, b) => a.walks > b.walks ? 1 : -1);
        return arr;
    }

    function sortBySO(arr) {
        arr.sort((a, b) => a.strikeouts > b.strikeouts ? -1 : 1);
        return arr;
    }

    function sortBySR(arr) {
        arr.sort((a, b) => a.strikeout_rate > b.strikeout_rate ? -1 : 1);
        return arr;
    }

    useEffect(() => {
        const url = window.location.href;
        const t1_name = (url.split('/').pop().split('-')).join(' ');
        const t2_name = (url.split('/').slice(-2)[0]).split('-').join(' ');
        lib.getPitchingLeadersTeam(t1_name, t2_name).then((res) => {
            setPitchData(res.result);
            setPitchByBat(sortByBattersFaced(res.result).slice(0, topPitchers));
            setPitchBySO(sortBySO(res.result).slice(0, topPitchers));
            setPitchBySR(sortBySR(res.result).slice(0, topPitchers));
            setTeam1(t1_name);
            setTeam2(t2_name);

            lib.getBattingLeadersTeam(t1_name, t2_name).then((res) => {
                setBatData(res.result);
                setBatByPitch(sortByPitch(res.result).slice(0, topBatters));
                setBatByBA(sortByBA(res.result).slice(0, topBatters));
                setBatByHR(sortByHR(res.result).slice(0, topBatters));
                setIsLoading(false);
            });
        });
    }, []);

    function handleChange(e){
        setTopPitchers(e.target.value);
    }

    function handleChangeBat(e){
        setTopBatters(e.target.value);
    }

    useEffect(() => {
        setBatByPitch(sortByPitch(batData).slice(0, topBatters));
        setBatByHR(sortByHR(batData).slice(0, topBatters));
        setBatByBA(sortByBA(batData).slice(0, topBatters));
    }, [topBatters]);

    useEffect(() => {
        setPitchByBat(sortByBattersFaced(pitchData).slice(0, topPitchers));
        setPitchBySO(sortBySO(pitchData).slice(0, topPitchers));
        setPitchBySR(sortBySR(pitchData).slice(0, topPitchers));
    }, [topPitchers]);

    return (
        !isLoading && 
        <div>
            <h2>Top Batting Performers</h2>
            <select id="t1" style={{width:'7%'}}class="form-select" aria-label="Default select example" value={topBatters} onChange={handleChangeBat}>
                    <option selected>5</option>
                    <option selected>10</option>
                    <option selected>20</option>
            </select>
            <hr></hr>
            <div className="leaders-outer">
                <div className="hr-leaders">
                    <h5>Most Homeruns</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Homeruns</th>
                            </tr>
                        </thead>
                        <tbody>
                        {batByHR.map((e, idx) => (
                                <tr>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{idx + 1}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.firstname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.lastname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.homeruns}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="hitting-leaders">
                    <h5>Best Batting Average</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Batting Avg.</th>
                            </tr>
                        </thead>
                        <tbody>
                        {batByBA.map((e, idx) => (
                                <tr>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{idx + 1}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.firstname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.lastname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.batting_avg}</td>
                                </tr>
                            ))}
   
                        </tbody>
                    </Table>
                </div> 
                <div className="hitting-leaders">
                    <h5>Best Eye</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Walks Drawn</th>
                            </tr>
                        </thead>
                        <tbody>
                        {batByPitch.map((e, idx) => (
                                <tr>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{idx + 1}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.firstname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.lastname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.walks}</td>
                                </tr>
                            ))}
   
                        </tbody>
                    </Table>
                </div> 
            </div>
            <h2>Top Pitching Performers</h2>
            <select id="t1" style={{width:'7%'}}class="form-select" aria-label="Default select example" value={topPitchers} onChange={handleChange}>
                    <option selected>5</option>
                    <option selected>10</option>
                    <option selected>20</option>
            </select>
            <hr></hr>
            <div className="leaders-outer">
                <div className="hr-leaders">
                    <h5>Most Strikeouts</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Strikeouts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pitchBySO.map((e, idx) => (
                                <tr>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{idx + 1}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.firstname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.lastname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.strikeouts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="hitting-leaders">
                    <h5>Strikeout Rate</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Strikeout Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                        {pitchBySR.map((e, idx) => (
                                <tr>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{idx + 1}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.firstname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.lastname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.strikeout_rate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="hitting-leaders">
                    <h5>Least Walks Allowed</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Walks Allowed</th>
                            </tr>
                        </thead>
                        <tbody>
                        {pitchByBat.map((e, idx) => (
                                <tr>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{idx + 1}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.firstname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.lastname}</td>
                                    <td style={{color: `${e.team === team1 ? 'blue': 'red'}`}}>{e.walks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>                          
            </div>
        </div>
    )
};

export default StatisticLeaders;