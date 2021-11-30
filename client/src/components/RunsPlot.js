import Plot from 'react-plotly.js';

function RunsPlot() {
    return (
        <div style={{position:'relative', right: '0px'}}>
        <Plot
        data={[
          {type: 'bar', x: ['10-20-2021', '10-25-2021', '10-26-2021'], y: [2, 5, 3], name: 'New York Yankees', marker: {
            color: 'blue'
          }},
          {type: 'bar', x: ['10-20-2021', '10-25-2021', '10-26-2021'], y: [10, 8, 1], name: 'Boston Red Sox', marker: {
            color: 'red'
          }},
        ]}
        layout={ {width: 700, height: 500, title: 'Scores Summary'} }
      />
      </div>
    )
};

export default RunsPlot;