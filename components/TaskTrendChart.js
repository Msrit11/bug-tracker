// components/TaskTrendChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register necessary chart elements
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const TaskTrendChart = ({ tasks }) => {
  // Assuming each task has a 'dueDate' field in 'YYYY-MM-DD' format
  const dates = tasks.map(task => task.dueDate || 'Unknown'); // Ensure default value for any missing dates
  
  // Chart data
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Tasks Over Time',
        data: dates.map((date, index) => index + 1), // Sample trend data, modify as needed
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  return <Line data={data} />;
};

export default TaskTrendChart;
