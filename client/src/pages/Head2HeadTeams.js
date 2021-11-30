import React, {useState} from 'react';
import NavBar from '../components/NavBar';
import '../stylesheets/Head2HeadTeams.css';
import {Tab, Tabs, Container} from 'react-bootstrap';
import Snap from '../components/Snap';
import RunsPlot from '../components/RunsPlot';
import StatisticLeaders from '../components/StatisticLeaders';

function Head2HeadTeams() {
    const [team1, setTeam1] = useState();
    const[team2, setTeam2] = useState();

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
    return (
        <div>
          <NavBar />
          <div className="selection">
              <div className="selectors">
                <select style={{width:'35%'}}class="form-select" aria-label="Default select example" value={team1} onChange={handleChangeT1}>
                    <option selected>Select a Team</option>
                    <option value="Boston Red Sox">Boston Red Sox</option>
                    <option value="New York Yankees">New York Yankees</option>
                    <option value="Philadelphia Phillies">Philadelphia Phillies</option>
                </select>
                <div className="versus">Versus</div>
                <select style={{width:'35%'}}class="form-select" aria-label="Default select example" value={team2} onChange={handleChangeT2}>
                    <option selected>Select a Team</option>
                    <option value="Boston Red Sox">Boston Red Sox</option>
                    <option value="New York Yankees">New York Yankees</option>
                    <option value="Philadelphia Phillies">Philadelphia Phillies</option>
                </select>
                <button class="h2h-go">Search<span class="fa fa-caret-right"></span></button>
              </div>
          </div>
          <Container>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="team" title="Team Statistics">
                    <Snap />
                    <div className="runs-plot">
                        <RunsPlot />
                    </div>
                </Tab>
                <Tab eventKey="leaders" title="Statistic Leaders">
                    <StatisticLeaders />
                </Tab>
            </Tabs>
          </Container>
        </div>
    )
}

export default Head2HeadTeams;