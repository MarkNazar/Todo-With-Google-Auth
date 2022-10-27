import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db, auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

import { useSelector } from 'react-redux';

const Home = () => {
  const [todoList, setTodoList] = useState(null);
  const todoRef = collection(db, 'todos');
  const [user] = useAuthState(auth);

  const getTodos = async () => {
    const data = await getDocs(todoRef);

    const ownData = data.docs
      ?.filter(doc => {
        return doc.data().userId === auth.currentUser.uid;
      })
      .map(doc => ({ ...doc.data(), id: doc.id }));
    setTodoList(ownData);
  };

  //Redux
  const value = useSelector(state => state.updateUi.value);

  useEffect(() => {
    getTodos();
  }, [value]);

  return (
    <div className='max-w-screen-md mx-auto'>
      <h1 className='text-center my-10 text-2xl font-bold'>TODO APP</h1>
      <div className='todos'>
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
  );
};

export default Home;
