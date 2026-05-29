import { createContext, useContext, useState, useEffect } from 'react';
import { themes, personas } from '../data/resumeData';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [currentPersona, setCurrentPersona] = useState('softwareDev');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-secondary', currentTheme.secondary);
    root.style.setProperty('--color-accent', currentTheme.accent);
    root.style.setProperty('--color-glow', currentTheme.glow);
    root.style.setProperty('--color-bg', currentTheme.bg);
    root.style.setProperty('--color-surface', currentTheme.surface);
    root.style.setProperty('--color-text', currentTheme.text);
    document.body.style.background = currentTheme.bg;
  }, [currentTheme]);

  const switchTheme = (theme) => setCurrentTheme(theme);
  const switchPersona = (id) => setCurrentPersona(id);
  const persona = personas[currentPersona];

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, switchTheme, currentPersona, persona, switchPersona, personas }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
