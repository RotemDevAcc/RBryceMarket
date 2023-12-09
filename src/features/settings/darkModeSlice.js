import { createSlice } from '@reduxjs/toolkit';

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('darkmode', state.isDarkMode);
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      localStorage.setItem('darkmode', action.payload);
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export const selectDarkMode = (state) => state.darkMode.isDarkMode;
export default darkModeSlice.reducer;
