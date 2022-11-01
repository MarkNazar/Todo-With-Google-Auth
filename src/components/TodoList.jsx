import React from 'react';
import TodoCard from './TodoCard';
import Loader from '../components/Loader';

import { useSelector } from 'react-redux';
import Categories from './Categories';
import TaskCount from './TaskCount';

const TodoList = ({ todoList }) => {
  const { status } = useSelector(state => state.loader.value);
  const { message } = useSelector(state => state.category.value);

  return (
    <section className='todolist p-4 '>
      <div className='border border-gray-200 p-4 flex flex-col space-y-6 relative'>
        {status && <Loader />}
        {/* {!todoList?.length && <p className='text-center'>Todo is empty. Add some task!</p>} */}
        {!todoList?.length && <p className='text-center capitalize'>{message ? message : 'Todo is empty. Add some task!'}</p>}
        {todoList?.map(todo => {
          const { id } = todo;
          return <TodoCard key={id} {...todo} />;
        })}
        <div className='flex flex-col justify-between items-start sm:flex-row sm:items-center'>
          <Categories />
          <TaskCount />
        </div>
      </div>
    </section>
  );
};

export default TodoList;
