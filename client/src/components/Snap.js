import '../stylesheets/Snap.css';

import {useEffect, useState} from 'react';

const lib = require('../fetcher.js');

function Snap() {

    const[data, setData] = useState([]);
    const[awayData, setAwayData] = useState([]);
    const [homeData, setHomeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const url = window.location.href;
        const t1 = (url.split('/').pop().split('-')).join(' ');
        const t2 = (url.split('/').slice(-2)[0]).split('-').join(' ');
        
        lib.geth2hteams(t1, t2).then((res) => {
            if (res.result[0].team !== t1) {
                let temp = res.result[0];
                res.result[0] = res.result[1];
                res.result[1] = temp;
            }
            setData(res.result);
            lib.geth2hteams(t1, t2, 'home').then((res) => {
                if (res.result[0].team !== t1) {
                    let temp = res.result[0];
                    res.result[0] = res.result[1];
                    res.result[1] = temp;
                }
                setHomeData(res.result);
            })
            lib.geth2hteams(t1, t2, 'away').then((res) => {
                if (res.result[0].team !== t1) {
                    let temp = res.result[0];
                    res.result[0] = res.result[1];
                    res.result[1] = temp;
                }
                setAwayData(res.result);
                setIsLoading(false);
            })
        })
    }, []);

    useEffect(() => {

    });

    return (
        !isLoading && <div className="snap-shot-outer">
            <div className="snap-shot-inner">
                <h4>Overall</h4>
                <div className="snap-shot-metrics">
                    <div className="team1">
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${100*data[0].wins/(data[0].wins + data[1].wins)}%`}} className="team1-wins">
                            </div>
                            <div className="num">{data[0].wins}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${(100*parseFloat(data[0].avg_score)/(parseFloat(data[0].avg_score) + parseFloat(data[1].avg_score))).toFixed(2)}%`}} className="team1-avg-runs">
                            </div>
                            <div className="num">{parseFloat(data[0].avg_score).toFixed(2)}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${100*data[0].max_runs/(data[0].max_runs + data[1].max_runs)}%`}}className="team1-max-runs">
                            </div>
                            <div className="num">{data[0].max_runs}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${100*data[0].min_runs/(data[0].min_runs + data[1].min_runs)}%`}} className="team1-min-runs">
                            </div>
                            <div className="num">{data[0].min_runs}</div>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="text">
                            Wins
                        </div>
                        <div className="text">
                            Avg. Runs
                        </div>
                        <div className="text">
                            Max Runs
                        </div>
                        <div className="text"> 
                            Min Runs
                        </div>
                    </div>
                    <div className="team2">
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{data[1].wins}</div>
                            <div style={{ width: `${100*data[1].wins/(data[0].wins + data[1].wins)}%`}} className="team2-wins">
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{parseFloat(data[1].avg_score).toFixed(2)}</div>
                            <div style={{ width: `${(100*parseFloat(data[1].avg_score)/(parseFloat(data[0].avg_score) + parseFloat(data[1].avg_score))).toFixed(2)}%`}} className="team2-avg-runs">
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{data[1].max_runs}</div>
                            <div style={{ width: `${100*data[1].max_runs/(data[0].max_runs + data[1].max_runs)}%`}} className="team2-max-runs">
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{data[1].min_runs}</div>
                            <div style={{ width: `${100*data[1].min_runs/(data[0].min_runs + data[1].min_runs)}%`}} className="team2-min-runs">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="snap-shot-inner">
                <h4>Home</h4>
                <div className="snap-shot-metrics">
                    <div className="team1">
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${100*homeData[0].wins/(homeData[0].wins + homeData[1].wins)}%`}} className="team1-wins">
                            </div>
                            <div className="num">{homeData[0].wins}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${(100*parseFloat(homeData[0].avg_score)/(parseFloat(homeData[0].avg_score) + parseFloat(homeData[1].avg_score))).toFixed(2)}%`}} className="team1-avg-runs">
                            </div>
                            <div className="num">{parseFloat(homeData[0].avg_score).toFixed(2)}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${100*homeData[0].max_runs/(homeData[0].max_runs + homeData[1].max_runs)}%`}}className="team1-max-runs">
                            </div>
                            <div className="num">{homeData[0].max_runs}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${100*homeData[0].min_runs/(homeData[0].min_runs + homeData[1].min_runs)}%`}} className="team1-min-runs">
                            </div>
                            <div className="num">{homeData[0].min_runs}</div>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="text">
                            Wins
                        </div>
                        <div className="text">
                            Avg. Runs
                        </div>
                        <div className="text">
                            Max Runs
                        </div>
                        <div className="text"> 
                            Min Runs
                        </div>
                    </div>
                    <div className="team2">
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{homeData[1].wins}</div>
                            <div style={{ width: `${100*homeData[1].wins/(homeData[0].wins + homeData[1].wins)}%`}} className="team2-wins">
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{parseFloat(homeData[1].avg_score).toFixed(2)}</div>
                            <div style={{ width: `${(100*parseFloat(homeData[1].avg_score)/(parseFloat(homeData[0].avg_score) + parseFloat(homeData[1].avg_score))).toFixed(2)}%`}} className="team2-avg-runs">
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{homeData[1].max_runs}</div>
                            <div style={{ width: `${100*homeData[1].max_runs/(homeData[0].max_runs + homeData[1].max_runs)}%`}} className="team2-max-runs">
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{homeData[1].min_runs}</div>
                            <div style={{ width: `${100*homeData[1].min_runs/(homeData[0].min_runs + homeData[1].min_runs)}%`}} className="team2-min-runs">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="snap-shot-inner">
                <h4>Away</h4>
                <div className="snap-shot-metrics">
                    <div className="team1">
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${100*awayData[0].wins/(awayData[0].wins + awayData[1].wins)}%`}} className="team1-wins">
                            </div>
                            <div className="num">{awayData[0].wins}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${(100*parseFloat(awayData[0].avg_score)/(parseFloat(awayData[0].avg_score) + parseFloat(awayData[1].avg_score))).toFixed(2)}%`}} className="team1-avg-runs">
                            </div>
                            <div className="num">{parseFloat(awayData[0].avg_score).toFixed(2)}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${100*awayData[0].max_runs/(awayData[0].max_runs + awayData[1].max_runs)}%`}} className="team1-max-runs">
                            </div>
                            <div className="num">{awayData[0].max_runs}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div style={{ width: `${100*awayData[0].min_runs/(awayData[0].min_runs + awayData[1].min_runs)}%`}} className="team1-min-runs">
                            </div>
                            <div className="num">{awayData[0].min_runs}</div>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="text">
                            Wins
                        </div>
                        <div className="text">
                            Avg. Runs
                        </div>
                        <div className="text">
                            Max Runs
                        </div>
                        <div className="text"> 
                            Min Runs
                        </div>
                    </div>
                    <div className="team2">
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{awayData[1].wins}</div>
                            <div style={{ width: `${100*awayData[1].wins/(awayData[0].wins + awayData[1].wins)}%`}} className="team2-wins">
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{parseFloat(awayData[1].avg_score).toFixed(2)}</div>
                            <div style={{ width: `${(100*parseFloat(awayData[1].avg_score)/(parseFloat(awayData[0].avg_score) + parseFloat(awayData[1].avg_score))).toFixed(2)}%`}} className="team2-avg-runs">
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{awayData[1].max_runs}</div>
                            <div style={{ width: `${100*awayData[1].max_runs/(awayData[0].max_runs + awayData[1].max_runs)}%`}} className="team2-max-runs">
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="num-team2">{awayData[1].min_runs}</div>
                            <div style={{ width: `${100*awayData[1].min_runs/(awayData[0].min_runs + awayData[1].min_runs)}%`}} className="team2-min-runs">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}

export default Snap;