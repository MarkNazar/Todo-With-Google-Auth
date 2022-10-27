import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

//Redux
import { useDispatch } from 'react-redux';
import { refresh } from '../feature/updateUiSlice';

const TodoCard = ({ title, id, status }) => {
  const dispatch = useDispatch();

  const handleCompleteTodo = async id => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      status: 1,
    });
    dispatch(refresh());
  };
  const handleDeleteTodo = async id => {
    // const todoRef = doc(db, 'todos');
    await deleteDoc(doc(db, 'todos', id));
    dispatch(refresh());
  };

  return (
    <div className='shadow-sm p-4'>
      <div className='flex items-center justify-between max-[460px]:flex-col max-[460px]:space-y-4'>
        <h4 className='' style={{ textDecoration: status ? 'line-through' : 'none' }}>
          {title}
        </h4>
        <div>
          <button
            disabled={status ? true : false}
            onClick={() => {
              handleCompleteTodo(id);
            }}
            className='p-2 bg-green-400 mr-2 disabled:opacity-25'
          >
            <CheckIcon />
          </button>
          <button
            onClick={() => {
              handleDeleteTodo(id);
            }}
            className='p-2 bg-red-400'
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
