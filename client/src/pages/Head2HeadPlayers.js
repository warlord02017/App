/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import '../stylesheets/Head2HeadPlayers.css';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Card, CardGroup} from 'react-bootstrap';

const lib = require('../fetcher.js');

function Head2HeadPlayers() {
    
    const [pitchers, setPitchers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [batters, setBatters] = useState();
    const [pitcher, setPitcher] = useState();
    const [batter, setBatter] = useState();
    const [isClick, setIsClick] = useState(false);
    const [pitcherName, setPitcherName] = useState();
    const [batterName, setBatterName] = useState();

    const [stats, setStats] = useState({});
    const [pitcherStats, setPitcherStats] = useState({});
    const [batterStats, setBatterStats] = useState({});

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
        const versus = {Single:0, Homerun:0, Triple: 0, Double: 0, Walk: 0, Strikeout: 0, 'Generic out': 0, Average: 0};
        lib.geth2hPlayers(pitcher, batter).then((res) => {
            res.result.forEach((r) => {
                versus[r.Outcome] = r.Occurrences;
            });
            versus.Average = (versus.Single + versus.Homerun + versus.Triple + versus.Double + versus.Walk) / (
                versus.Single + versus.Homerun + versus.Triple + versus.Double + versus.Walk + versus.Strikeout + versus['Generic out']);
            setStats(versus);
            lib.getBatterStats(batter, "2011-01-01", "2016-01-01").then((res) => {
                setBatterStats(res.result);
                lib.getPitcherStats(pitcher).then((res) => {
                    setPitcherStats(res.result);
                    setIsClick(true);
                })
            })
        })
    };

    useEffect(() => {

    }, [stats]);

    function handlePitchChange(event, data){
        setPitcher(data.value);
        setPitcherName(pitchers.find(o => o.value === data.value).text);
    }

    function handleBatChange(event, data) {
        setBatter(data.value);
        setBatterName(batters.find(o => o.value === data.value).text);
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
        {isClick &&
        <div>
            <h1 id="label">{pitcherName} Vs. {batterName}</h1>
          <CardGroup>
              <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {stats.Homerun}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Homeruns
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {stats.Single}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Singles
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {stats.Double}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Doubles
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {stats.Triple}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Triples
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {stats.Walk}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Walks
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {stats.Strikeout}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Strikeouts
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                {stats['Generic out']}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Outs
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                {isNaN(stats.Average) ? 0 : stats.Average.toFixed(3)}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Batting Avg.
                </Card.Footer>
              </Card>
            </CardGroup>
            <h1 id ="label">{batterName} Career Batting Stats</h1>
            <CardGroup style={{marginTop: '2%'}}>
                <Card>
                    <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {batterStats.Homeruns}
                    </Card.Body>
                    <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                        Homeruns
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {batterStats.Singles}
                    </Card.Body>
                    <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                        Singles
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {batterStats.Doubles}
                    </Card.Body>
                    <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                        Doubles
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {batterStats.Triples}
                    </Card.Body>
                    <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                        Triples
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                    {batterStats.BattingAvg.toFixed(3)}
                    </Card.Body>
                    <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                        Batting Avg.
                    </Card.Footer>
                </Card>
            </CardGroup>
            <h1 id="label">{pitcherName} Career Pitching Stats</h1>
            <CardGroup style={{marginTop: '2%'}}>
             <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                {pitcherStats.HomerunsAllowed}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Homeruns
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                {pitcherStats.SinglesAllowed}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Singles
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                {pitcherStats.DoublesAllowed}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Doubles
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                {pitcherStats.TriplesAllowed}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Triples
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                {pitcherStats.WalksAllowed}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                    Walks
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                {pitcherStats.Strikeouts}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                     Strikeouts
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body style={{color: '#E25', fontSize: '35px', textAlign: 'center'}}>
                {pitcherStats.StrikeoutRate.toFixed(3)}
                </Card.Body>
                <Card.Footer style={{fontSize: '25px' , textAlign: 'center', border: 'none'}}>
                     Strikeout Rate
                </Card.Footer>
            </Card>
                
                
            </CardGroup>

            </div>
            }
          </div>
 
        </div>
    )
}

export default Head2HeadPlayers;