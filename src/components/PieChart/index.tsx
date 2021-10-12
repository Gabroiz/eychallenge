import React, { useState } from 'react';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { api } from 'services/api';

export default function Chart() {
  const [budgetLeft, setBudgetLeft] = useState(0)
  const [budgetUsed, setBudgetUsed] = useState(0)

  useEffect(() => {
    getBudgetData()
  }, [])

  function getBudgetData() {
    api.get('/smu').then((response) => {
      let leftBudget = 0;
      let usedBudget = 0;

      response.data.map((record) => {
        leftBudget += record.budget;
        usedBudget += (record.totalBudget - record.budget);
      })

      setBudgetLeft(leftBudget)
      setBudgetUsed(usedBudget)

      console.log(response);
    })
  }

  const data = {
    labels: [
      'Budget utilizado',
      'Budget restante',
    ],
    datasets: [{
      data: [budgetUsed, budgetLeft],
      backgroundColor: [
        '#8884d853',
        '#8884d8',
      ],
      hoverBackgroundColor: [
        '#8884d853',
        '#8884d8',
      ]
    }]
  };

  return (
    <Doughnut
      data={data}
      width={2}
      height={2}
    />
  );
}