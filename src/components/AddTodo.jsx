import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useDispatch } from 'react-redux';
import { refresh } from '../feature/updateUiSlice';

const AddTodo = () => {
  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
  });

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [user] = useAuthState(auth);

  // Reference Firebase Doc
  const todoRef = collection(db, 'todos');

  //Redux
  const dispatch = useDispatch();

  const onAddTodo = async data => {
    await addDoc(todoRef, {
      ...data,
      status: 0,
      userId: user.uid,
    });
    resetField('title');
    dispatch(refresh());
  };

  return (
    <section className='add-todo p-4'>
      <form onSubmit={handleSubmit(onAddTodo)}>
        <div className='flex'>
          <input className={`basis-9/12 p-2 border outline-none ${errors.title ? 'border-red-500' : 'border-gray-200'}`} type='text' {...register('title')} />
          <input className='basis-1/4 p-2 bg-blue-700 text-white' type='submit' value='Add' />
        </div>
        {errors.title && <p className='py-[4px] text-red-500'>{errors.title.message}</p>}
      </form>
    </section>
  );
};

export default AddTodo;
