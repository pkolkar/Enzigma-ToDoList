import React, { useState, useEffect } from 'react';

const TaskForm = ({ currentTask, onSave }) => {
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    if (currentTask) setTaskName(currentTask.name);
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) return;
    onSave({ id: currentTask ? currentTask.id : Date.now(), name: taskName });
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task"
      />
      <button type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
