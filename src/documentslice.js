import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  title: ''
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    }
  },
});

export const { setContent, setTitle } = documentSlice.actions;
export default documentSlice.reducer;
