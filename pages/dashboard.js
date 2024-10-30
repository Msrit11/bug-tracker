// pages/dashboard.js
import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TaskTrendChart from '../components/TaskTrendChart';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState('All');
  const [sortKey, setSortKey] = useState('Priority');

  // Add or update a task
  const addTask = (task) => {
    if (taskToEdit) {
      setTasks(tasks.map(t => (t === taskToEdit ? task : t)));
      setTaskToEdit(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  // Update time spent on a task
  const updateTaskTime = (taskToUpdate, timeSpent) => {
    setTasks(tasks.map(task => (task === taskToUpdate ? { ...task, timeSpent } : task)));
  };

  // Set task to be edited
  const editTask = (task) => {
    setTaskToEdit(task);
  };

  // Delete a task
  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  };

  // Filter tasks based on selected criteria
  const filteredTasks = tasks.filter(task => 
    filter === 'All' || task.status === filter
  );

  // Sort tasks based on selected criteria
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortKey === 'Priority') {
      return a.priority.localeCompare(b.priority);
    } else if (sortKey === 'Due Date') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.dashboardContainer}>
        <h1 style={styles.title}>Dashboard</h1>
        
        <div style={styles.chartContainer}>
          <TaskTrendChart tasks={tasks} options={chartOptions} />
        </div>

        <div style={styles.controlsContainer}>
          <label style={styles.label}>Filter by Status:</label>
          <select style={styles.select} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <label style={styles.label}>Sort by:</label>
          <select style={styles.select} onChange={(e) => setSortKey(e.target.value)}>
            <option value="Priority">Priority</option>
            <option value="Due Date">Due Date</option>
          </select>
        </div>

        <div style={styles.taskFormContainer}>
          <TaskForm addTask={addTask} initialTask={taskToEdit} />
        </div>

        <div style={styles.taskList}>
          {sortedTasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              updateTaskTime={updateTaskTime}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Chart.js options with axis labels
const chartOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
        font: {
          family: 'Arial',
          size: 10,
          weight: 'bold',
        },
      },
    },
    y: {
      title: {
        display: true,
        text: 'Task Count',
        font: {
          family: 'Arial',
          size: 10,
          weight: 'bold',
        },
      },
    },
  },
};

const styles = {
  fullScreenContainer: {
    minHeight: '100vh',
    backgroundColor: '#e0f7fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardContainer: {
    maxWidth: '600px', // Smaller width
    width: '100%',
    padding: '15px', // Reduced padding
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.8rem', // Smaller font size
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: '15px',
  },
  chartContainer: {
    marginBottom: '15px',
    backgroundColor: '#ffffff',
    padding: '10px', // Reduced padding
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  controlsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '8px', // Reduced padding
    borderRadius: '8px',
    backgroundColor: '#f3f4f6',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontSize: '0.9rem', // Smaller font size
    fontWeight: '500',
    color: '#555',
  },
  select: {
    padding: '6px', // Reduced padding
    fontSize: '0.9rem', // Smaller font size
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    fontFamily: 'Arial, sans-serif',
  },
  taskFormContainer: {
    marginBottom: '15px',
    backgroundColor: '#ffffff',
    padding: '15px', // Reduced padding
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', // Reduced spacing between tasks
  },
};

export default Dashboard;
