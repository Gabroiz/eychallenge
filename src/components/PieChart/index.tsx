import * as React from 'react';
import {Doughnut} from 'react-chartjs-2';

const data = {
  labels: [
    'Budget utilizado',
    'Budget restante',
],
datasets: [{
  data: [300, 50],
  backgroundColor: [
  '#8884d8',
  '#8884d853',
  ],
  hoverBackgroundColor: [
  '#8884d8',
  '#8884d853',
  ]
}]
};


export default function Chart() {
    return (
      <Doughnut
        data={data}
        width={2}
        height={2}
      />
    );
}