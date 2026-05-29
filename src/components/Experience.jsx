import { useTheme } from '../context/ThemeContext';

export default function Experience() {
  const { currentTheme, persona } = useTheme();

  return (
    <section id="experience" className="section section-alt">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title" style={{ color: currentTheme.primary }}>
            Experience
          </h2>
          <div className="section-line" style={{ background: `linear-gradient(90deg, ${currentTheme.primary}, transparent)` }} />
        </div>

        <div className="timeline">
          {persona.experience.map((exp, i) => (
            <div key={i} className="timeline-item">
              {/* Timeline connector */}
              <div className="timeline-connector">
                <div className="timeline-dot" style={{ background: currentTheme.primary, boxShadow: `0 0 12px ${currentTheme.glow}` }} />
                {i < persona.experience.length - 1 && (
                  <div className="timeline-line" style={{ background: `linear-gradient(to bottom, ${currentTheme.primary}88, transparent)` }} />
                )}
              </div>

              {/* Card */}
              <div
                className="timeline-card"
                style={{
                  borderColor: currentTheme.primary + '33',
                  background: `linear-gradient(135deg, ${currentTheme.surface}, rgba(0,0,0,0.3))`,
                }}
              >
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role" style={{ color: currentTheme.accent }}>{exp.role}</h3>
                    <p className="exp-company" style={{ color: currentTheme.primary }}>{exp.company}</p>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-period" style={{ borderColor: currentTheme.primary + '55', color: currentTheme.primary }}>
                      📅 {exp.period}
                    </span>
                    <span className="exp-location">📍 {exp.location}</span>
                  </div>
                </div>
                <ul className="exp-points">
                  {exp.points.map((point, j) => (
                    <li key={j} className="exp-point">
                      <span className="exp-bullet" style={{ color: currentTheme.primary }}>▶</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
