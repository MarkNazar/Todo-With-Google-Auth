import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { total: 0, completed: 0 };

export const taskCountSlice = createSlice({
  name: 'taskCount',
  initialState: { value: initialStateValue },
  reducers: {
    setCount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCount } = taskCountSlice.actions;

export default taskCountSlice.reducer;
