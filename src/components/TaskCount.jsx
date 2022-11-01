import React from 'react';
import { useSelector } from 'react-redux';

const TaskCount = () => {
  const { total, completed } = useSelector(state => state.taskCount.value);

  return (
    <p className='mt-4 sm:mt-0'>
      Task{total > 1 ? 's' : ''}: {completed} / {total}
    </p>
  );
};

export default TaskCount;
