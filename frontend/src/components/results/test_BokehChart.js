import React from 'react';
import Plot from 'react-plotly.js';

class BokehChart extends React.Component {
  render() {
    return (
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
        ]}
        layout={ {width: 400, height: 240} }
      />
    );
  }
}


export default BokehChart;