// components/TaskTrendChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart elements
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const TaskTrendChart = ({ tasks }) => {
  // Aggregate tasks by due date
  const taskCountsByDate = tasks.reduce((counts, task) => {
    const date = task.dueDate || 'Unknown';
    counts[date] = (counts[date] || 0) + 1;
    return counts;
  }, {});

  // Extract dates and counts, sorting by date
  const dates = Object.keys(taskCountsByDate).sort();
  const taskCounts = dates.map(date => taskCountsByDate[date]);

  // Chart data
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Tasks Due by Date',
        data: taskCounts,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointRadius: 5,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Due Date',
          font: { family: 'Arial', size: 12, weight: 'bold' },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Tasks',
          font: { family: 'Arial', size: 12, weight: 'bold' },
        },
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  return <Line data={data} options={options} />;
};

export default TaskTrendChart;

