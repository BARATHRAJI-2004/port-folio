import { useTheme } from '../context/ThemeContext';

export default function Education() {
  const { currentTheme, persona } = useTheme();

  return (
    <section id="education" className="section section-alt">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title" style={{ color: currentTheme.primary }}>
            Education
          </h2>
          <div className="section-line" style={{ background: `linear-gradient(90deg, ${currentTheme.primary}, transparent)` }} />
        </div>

        <div className="edu-grid">
          {persona.education.map((edu, i) => (
            <div
              key={i}
              className="edu-card"
              style={{
                borderColor: currentTheme.primary + '33',
                background: `linear-gradient(135deg, ${currentTheme.surface}, rgba(0,0,0,0.3))`,
              }}
            >
              <div className="edu-icon" style={{ color: currentTheme.primary }}>
                {i === 0 ? '🎓' : '📖'}
              </div>
              <div className="edu-content">
                <h3 className="edu-degree" style={{ color: currentTheme.accent }}>{edu.degree}</h3>
                <p className="edu-institution" style={{ color: currentTheme.primary }}>{edu.institution}</p>
                <p className="edu-university">{edu.university}</p>
                <div className="edu-footer">
                  <span className="edu-period" style={{ borderColor: currentTheme.primary + '55', color: currentTheme.primary }}>
                    📅 {edu.period}
                  </span>
                </div>
                <div className="edu-relevant">
                  <span className="edu-relevant-label" style={{ color: currentTheme.primary }}>Relevant:</span>{' '}
                  {edu.relevant}
                </div>
              </div>
              <div
                className="edu-corner-line"
                style={{ background: `linear-gradient(to bottom, ${currentTheme.primary}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="certs-section">
          <h3 className="certs-title" style={{ color: currentTheme.primary }}>
            Certifications & Achievements
          </h3>
          <div className="certs-grid">
            {persona.certifications.map((cert, i) => (
              <div
                key={i}
                className="cert-badge"
                style={{
                  borderColor: currentTheme.primary + '44',
                  background: currentTheme.surface,
                }}
              >
                <span className="cert-icon">{cert.icon}</span>
                <div className="cert-info">
                  <span className="cert-name" style={{ color: currentTheme.accent }}>{cert.name}</span>
                  <span className="cert-issuer">{cert.issuer}</span>
                </div>
                <span className="cert-year" style={{ color: currentTheme.primary }}>{cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
