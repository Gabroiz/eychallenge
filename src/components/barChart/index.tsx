import { Box, Paper } from '@mui/material';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'PI',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Other Advisory',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Risk',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/mixed-bar-chart-q4hgc';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" name="Budget Restante" stackId="a" fill="#8884d8" />
          <Bar dataKey="amt" name="Budget Utilizado" stackId="a" fill="#8884d853" />
          <Bar dataKey="uv" name="Salário Médio" fill="#FFCE56" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
