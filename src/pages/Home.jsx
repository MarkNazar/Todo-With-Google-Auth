import { getDocs, collection, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db, auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../feature/loaderSlice';
import { setCount } from '../feature/taskCountSlice';

const Home = () => {
  const [todoList, setTodoList] = useState(null);
  const todoRef = collection(db, 'todos');
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();

  const getTaskCount = data => {
    const ownData = data.docs
      ?.filter(doc => {
        return doc.data().userId === auth.currentUser.uid;
      })
      .map(doc => ({ ...doc.data(), id: doc.id }));
    const completedTask = ownData?.filter(data => data.status === 1);
    dispatch(setCount({ total: ownData.length, completed: completedTask.length }));
  };

  const getTodos = async category => {
    dispatch(setLoader({ text: 'Getting data', status: true }));
    const data = await getDocs(todoRef);
    if (category === 'all') {
      const ownData = data.docs
        ?.filter(doc => {
          return doc.data().userId === auth.currentUser.uid;
        })
        .map(doc => ({ ...doc.data(), id: doc.id }));
      setTodoList(ownData);
    } else {
      const q = query(todoRef, where('status', '==', category === 'completed' ? 1 : 0));
      const data = await getDocs(q);
      const ownData = data.docs
        ?.filter(doc => {
          return doc.data().userId === auth.currentUser.uid;
        })
        .map(doc => ({ ...doc.data(), id: doc.id }));

      setTodoList(ownData);
    }
    dispatch(setLoader({ text: '', status: false }));
    getTaskCount(data);
  };

  //Redux
  const value = useSelector(state => state.updateUi.value);
  const { category } = useSelector(state => state.category.value);

  useEffect(() => {
    getTodos(category);
  }, [value]);

  return (
    <div className='h-full bg-white dark:bg-slate-900 dark:text-white'>
      <div className='max-w-screen-md mx-auto py-10'>
        <h1 className='text-center text-2xl font-bold mb-6'>TODO APP</h1>
        <div className='todos relative'>
          {user && (
            <>
              <AddTodo />
              <TodoList todoList={todoList} />
              <Footer />
            </>
          )}
          {!user && <p className='text-center'>Login first to add todo</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
