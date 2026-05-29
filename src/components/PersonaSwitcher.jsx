import { useTheme } from '../context/ThemeContext';

const PERSONA_LIST = [
  { id: 'softwareDev', label: 'Software Dev', icon: '⚡' },
  { id: 'csharpDev',   label: 'C# / .NET',    icon: '🔷' },
  { id: 'cybersec',    label: 'Cybersecurity', icon: '🔐' },
];

export default function PersonaSwitcher() {
  const { currentPersona, switchPersona, currentTheme } = useTheme();

  return (
    <div className="persona-switcher">
      {PERSONA_LIST.map((p) => (
        <button
          key={p.id}
          className={`persona-btn ${currentPersona === p.id ? 'persona-active' : ''}`}
          onClick={() => switchPersona(p.id)}
          style={
            currentPersona === p.id
              ? {
                  background: `linear-gradient(135deg, ${currentTheme.primary}22, ${currentTheme.secondary}33)`,
                  borderColor: currentTheme.primary,
                  color: currentTheme.primary,
                  boxShadow: `0 0 18px ${currentTheme.glow}`,
                }
              : {}
          }
        >
          <span className="persona-icon">{p.icon}</span>
          <span className="persona-label">{p.label}</span>
          {currentPersona === p.id && (
            <span className="persona-active-dot" style={{ background: currentTheme.primary }} />
          )}
        </button>
      ))}
    </div>
  );
}
