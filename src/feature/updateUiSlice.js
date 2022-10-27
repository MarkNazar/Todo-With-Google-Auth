import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = false;

export const updateUiSlice = createSlice({
  name: 'updateUi',
  initialState: { value: initialStateValue },
  reducers: {
    refresh: (state, action) => {
      state.value = !state.value;
    },
  },
});

export const { refresh } = updateUiSlice.actions;

export default updateUiSlice.reducer;
