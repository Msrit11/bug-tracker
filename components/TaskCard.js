// components/TaskCard.js
import Timer from './Timer';

const TaskCard = ({ task, updateTaskTime, editTask, deleteTask }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Assignee: {task.assignee}</p>
      <p>Due Date: {task.dueDate}</p>
      <Timer onTimeUpdate={(time) => updateTaskTime(task, time)} />
      <button onClick={() => editTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task)}>Delete</button>
    </div>
  );
};

export default TaskCard;
