import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import '../stylesheets/Head2HeadTeams.css';
import {Tab, Tabs, Container} from 'react-bootstrap';
import Snap from '../components/Snap';
import RunsPlot from '../components/RunsPlot';
import StatisticLeaders from '../components/StatisticLeaders';
import { useNavigate } from 'react-router-dom';

const lib = require('../fetcher.js');

function Head2HeadTeams() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [team1, setTeam1] = useState({});
    const [team2, setTeam2] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [t1Name, setT1Name] = useState();
    const [t2Name, setT2Name] = useState();

    useEffect(() => {
        lib.getTeams().then((res) => setTeams(res.data));
        const url = window.location.href;
        const t1_name = (url.split('/').pop().split('-')).join(' ');
        setT1Name(t1_name);
        const t2_name = (url.split('/').slice(-2)[0]).split('-').join(' ');
        setT2Name(t2_name);
        setIsLoading(true);
    }, []);

    function handleChangeT1(e) {
        if (e.target.value !== 'Select a Team') {
            setTeam1(e.target.value);
        } else {
            setTeam1('');
        }
    }
    
    function handleChangeT2(e) {
        if (e.target.value !== 'Select a Team') {
            setTeam2(e.target.value);
        } else {
            setTeam2('');
        }
    }

    function search() {
        navigate(`/Head2Head/teams/${team1.split(' ').join('-')}/${team2.split(' ').join('-')}`);
        window.location.reload();
    };

    return (
        isLoading &&
        <div>
          <NavBar />
          <div className="selection">
              <div className="selectors">
                <select id="t1" style={{width:'35%'}}class="form-select" aria-label="Default select example" value={team1} onChange={handleChangeT1}>
                    <option selected>Select a Team</option>
                    {teams.map((t)=> (
                        <option value={t}>{t}</option>
                    ))}
                </select>
                <div className="versus">Versus</div>
                <select id="t2" style={{width:'35%'}}class="form-select" aria-label="Default select example" value={team2} onChange={handleChangeT2}>
                    <option selected>Select a Team</option>
                    {teams.map((t) => (
                        <option value={t}>{t}</option>
                    ))}
                </select>
                <button onClick={search} class="h2h-go">Search<span class="fa fa-caret-right"></span></button>
              </div>
          </div>
          <p><span id="t1-name">{t1Name}</span>&nbsp;Vs.&nbsp;<span id="t2-name">{t2Name}</span></p>
          <Container>
            <Tabs defaultActiveKey="team" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="team" title="Team Statistics">
                    <Snap />
                    <div className="runs-plot">
                        <RunsPlot />
                    </div>
                </Tab>
                <Tab eventKey="leaders" title="Statistic Leaders">
                    <StatisticLeaders/>
                </Tab>
            </Tabs>
          </Container>
        </div>
    )
}

export default Head2HeadTeams;