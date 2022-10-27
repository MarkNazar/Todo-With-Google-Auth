import React from 'react';
import TodoCard from './TodoCard';

const TodoList = ({ todoList }) => {
  return (
    <section className='todolist p-4 '>
      <div className='border border-gray-200 p-4 flex flex-col space-y-6'>
        {!todoList?.length && <p className='text-center'>No todo List</p>}
        {todoList?.map(todo => {
          const { id } = todo;
          return <TodoCard key={id} {...todo} />;
        })}
      </div>
    </section>
  );
};

export default TodoList;
