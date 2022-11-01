import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { category: 'all', message: '' };

export const categorySlice = createSlice({
  name: 'category',
  initialState: { value: initialStateValue },
  reducers: {
    setMessage: (state, action) => {
      state.value.message = action.payload;
    },
    setCategory: (state, action) => {
      state.value.category = action.payload;
    },
  },
});

export const { setCategory, setMessage } = categorySlice.actions;

export default categorySlice.reducer;
