import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  const toggleTheme = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  return [theme, toggleTheme];
};

export default useDarkMode;
