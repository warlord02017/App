import Plot from 'react-plotly.js';
import {useEffect, useState} from 'react';

const lib = require('../fetcher.js');

function RunsPlot() {

  const [isLoading, setIsLoading] = useState(true);
  const [t1Data, setT1Data] = useState();
  const [t2Data, setT2Data] = useState();

  function formatDate(d) {
    let m = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let y = d.getFullYear().toString();
    let res = m + "-" + day + "-" + y;
    return res;
  }

  function getScores(rows, t1_name, t2_name) {
    let map = {}
    map[t1_name] = [];
    map[t2_name] = [];
    rows.map((r) => {
      map[r.AwayTeam].push(r.AwayScore);
      map[r.HomeTeam].push(r.HomeScore)
    })
    return map;
  }

  useEffect(() => {
    const url = window.location.href;
    const t1_name = (url.split('/').pop().split('-')).join(' ');
    const t2_name = (url.split('/').slice(-2)[0]).split('-').join(' ');
    lib.getGames(t1_name, t2_name).then((res) => {
      const dates = res.result.map((r) => formatDate(new Date(r.Date)));
      let map = getScores(res.result, t1_name, t2_name);
      setT1Data({type: 'bar', x: dates, y: map[t1_name], name: t1_name, marker: {
        color: 'blue'
      }});
      setT2Data({type: 'bar', x: dates, y: map[t2_name], name: t2_name, marker: {
        color: 'red'
      }});
      setIsLoading(false);
    });
  }, []);

    return (
      !isLoading &&
        <div style={{position:'relative', right: '0px', top: '50px'}}>
        <Plot
        data={[
          t1Data,
          t2Data
        ]}
        layout={ {width: 700, height: 500, title: 'Scores Summary'} }
      />
      </div>
    )
};

export default RunsPlot;
