import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RedoIcon from '@mui/icons-material/Redo';

import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

//Redux
import { useDispatch } from 'react-redux';
import { refresh } from '../feature/updateUiSlice';
import { setLoader } from '../feature/loaderSlice';

const TodoCard = ({ title, id, status }) => {
  const dispatch = useDispatch();

  const handleCompleteTodo = async id => {
    dispatch(setLoader({ text: 'Marking as done', status: true }));
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      status: 1,
    });
    dispatch(setLoader({ text: '', status: false }));
    dispatch(refresh());
  };
  const handleDeleteTodo = async id => {
    // const todoRef = doc(db, 'todos');
    dispatch(setLoader({ text: 'Deleting', status: true }));
    await deleteDoc(doc(db, 'todos', id));
    dispatch(setLoader({ text: '', status: false }));
    dispatch(refresh());
  };

  const handleRedoTodo = async id => {
    dispatch(setLoader({ text: 'Setting the task active', status: true }));
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      status: 0,
    });
    dispatch(setLoader({ text: '', status: false }));
    dispatch(refresh());
  };

  return (
    <div className='border-b border-slate-200 p-4 dark:bg-slate-900 dark:text-white dark:border-b dark:border-slate-700'>
      <div className='flex items-center justify-between max-[460px]:flex-col max-[460px]:space-y-4'>
        <h4 className='' style={{ textDecoration: status ? 'line-through' : 'none' }}>
          {title}
        </h4>
        <div>
          {!!status && (
            <button
              title='Redo Task'
              className='p-2 bg-green-400 mr-2 disabled:opacity-25'
              onClick={() => {
                handleRedoTodo(id);
              }}
            >
              <RedoIcon />
            </button>
          )}
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
