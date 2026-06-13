import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // default to light

  useEffect(() => {
    // In future, you can implement dark mode switching here
    // For now, it stays strictly in the premium 'light' (Semafor cream) theme.
    document.documentElement.classList.add('theme-light');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
