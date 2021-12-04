/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Head2HeadPlayers.css';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Card} from 'react-bootstrap';

const lib = require('../fetcher.js');

function Head2HeadPlayers() {
    const navigate = useNavigate();
    const [pitchers, setPitchers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [batters, setBatters] = useState();
    const [pitcher, setPitcher] = useState();
    const [batter, setBatter] = useState();
    const [isClick, setIsClick] = useState(true);

    const [stats, setStats] = useState({hr:0, singles:0, doubles: 0, triples: 0, walks: 0, strikeouts: 0, outs: 0});

    useEffect(async () => {
        const pitchers = await lib.getPitchers();
        const res_pitch = pitchers.result.map((p) => ({key: p.ID, value: p.ID, text: p.FirstName + " " + p.LastName}));
        setPitchers(res_pitch);
        const batters = await lib.getBatters();
        const res_bat= batters.result.map((p) => ({key: p.ID, value: p.ID, text: p.FirstName + " " + p.LastName}));
        setBatters(res_bat);
        setIsLoading(false);
    }, []);

    function search() {
        const temp = {Single:0, Homerun:0, Triple: 0, Double: 0, Walk: 0, Strikeout: 0, 'Generic out': 0};
        lib.geth2hPlayers(pitcher, batter).then((res) => {
            res.result.forEach((r) => {
                temp[r.Outcome] = r.Occurrences;
            });
            setStats(temp);
            setIsClick(true);
        })
    };

    useEffect(() => {

    }, [stats]);

    function handlePitchChange(event, data){
        const { value } = data;
        setPitcher(value);
    }

    function handleBatChange(event, data) {
        const { value } = data;
        setBatter(value);
    }
    
    return (
        !isLoading &&
        <div>
          <NavBar />
          <div className="selection">
              <Dropdown
                    style={{width: '300px', height: '10px', marginRight: '10px'}}
                    placeholder='Select a Pitcher'
                    fluid
                    search
                    selection
                    options={pitchers}
                    onChange={handlePitchChange}
              />
              <Dropdown
                    style={{width: '300px', height: '10px'}}
                    placeholder='Select a Batter'
                    fluid
                    search
                    selection
                    options={batters}
                    onChange={handleBatChange}
              />
              <button onClick={search} class="h2h-go">Search<span class="fa fa-caret-right"></span></button>
          </div>
          <div>
            {isClick && <Card body>
                <p>HR: {stats.Homerun}</p>
                <p>Singles: {stats.Single}</p>
                <p>Doubles: {stats.Double}</p>
                <p>Triples: {stats.Triple}</p>
                <p>Walks: {stats.Walk}</p>
                <p>Outs: {stats['Generic out']}</p>
                <p>Strikeouts: {stats.Strikeout}</p>
            </Card>}
          </div>
        </div>
    )
}

export default Head2HeadPlayers;