import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode, selectDarkMode } from './darkModeSlice';

function DarkMode() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectDarkMode);

  useEffect(() => {
    // Check if dark mode is enabled in local storage
    const darkmode = localStorage.getItem('darkmode');
    if (darkmode === 'true') {
      // Dispatch action to set dark mode
      dispatch(setDarkMode(true));
    }

    // Cleanup function to remove dark mode styles when the component is unmounted
    return () => {
      // Cleanup logic here if needed
    };
  }, [dispatch]); // Include dispatch in the dependency array to satisfy the eslint rule

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return null;
}

export default DarkMode;
