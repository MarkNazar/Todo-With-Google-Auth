import React, { useState } from 'react';
import { categories } from '../static/categories';

import { useDispatch } from 'react-redux';
import { setCategory } from '../feature/categorySlice';
import { setMessage } from '../feature/categorySlice';
import { refresh } from '../feature/updateUiSlice';
import { act } from 'react-dom/test-utils';

const Categories = () => {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();

  const setActiveClass = (e, id) => {
    setActive(id);
  };

  const handleFilterCategory = title => {
    const message = title === 'all' ? 'No todos. Add some Tasks!' : `${title} is empty.`;
    dispatch(setCategory(title));
    dispatch(setMessage(message));
    dispatch(refresh());
  };

  return (
    <div className='flex'>
      {categories.map(category => {
        const { id, title } = category;
        return (
          <button
            className={`capitalize ${active === id ? 'bg-slate-100 dark:bg-slate-800' : 'bg-transparent'} px-4 py-1 rounded-sm`}
            onClick={e => {
              setActiveClass(e, id);
              handleFilterCategory(title);
            }}
            key={id}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
