import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData } from 'types/chart-data.types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface BarChartProps {
  data: ChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'EGLD',
        data: data.map(item => item.value),
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
        text: 'Donations from your fans',
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 2,
      },
    },
  };

  return (
    <div>
      {
        data && data.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          'You do not have any donations yet.'
        )
      }

    </div>
  );
};

export default BarChart;
