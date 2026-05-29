import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { themes, currentTheme, switchTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="theme-switcher-wrap">
      <button
        className="theme-toggle-btn"
        onClick={() => setOpen(!open)}
        title="Switch Theme"
        style={{ borderColor: currentTheme.primary, boxShadow: `0 0 14px ${currentTheme.glow}` }}
      >
        <span className="theme-toggle-icon">🎨</span>
        <span className="theme-toggle-label">Themes</span>
      </button>
      {open && (
        <div className="theme-panel">
          <p className="theme-panel-title">Choose Theme</p>
          <div className="theme-grid">
            {themes.map((t) => (
              <button
                key={t.id}
                className={`theme-orb ${currentTheme.id === t.id ? 'active' : ''}`}
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${t.accent}, ${t.primary}, ${t.secondary})`,
                  boxShadow: currentTheme.id === t.id ? `0 0 16px ${t.glow}, 0 0 4px ${t.primary}` : 'none',
                }}
                onClick={() => { switchTheme(t); setOpen(false); }}
                title={t.label}
              >
                {currentTheme.id === t.id && <span className="orb-check">✓</span>}
              </button>
            ))}
          </div>
          <div className="theme-names">
            {themes.map((t) => (
              <span
                key={t.id}
                className={`theme-name-tag ${currentTheme.id === t.id ? 'active-name' : ''}`}
                style={currentTheme.id === t.id ? { color: t.primary } : {}}
                onClick={() => { switchTheme(t); setOpen(false); }}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
