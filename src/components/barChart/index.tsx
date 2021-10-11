import { Box, Paper } from '@mui/material';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'PI',
    uv: 3500,
    pv: 2400,
    amt: 5000,
  },
  {
    name: 'Other Advisory',
    uv: 3000,
    pv: 1200,
    amt: 5000,
  },
  {
    name: 'Risk',
    uv: 4000,
    pv: 1900,
    amt: 5000,
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
