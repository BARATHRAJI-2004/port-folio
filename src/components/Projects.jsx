import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Projects() {
  const { currentTheme, persona } = useTheme();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title" style={{ color: currentTheme.primary }}>
            Key Projects
          </h2>
          <div className="section-line" style={{ background: `linear-gradient(90deg, ${currentTheme.primary}, transparent)` }} />
        </div>

        <div className="projects-grid">
          {persona.projects.map((project, i) => (
            <div
              key={i}
              className={`project-card ${hovered === i ? 'project-hovered' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderColor: hovered === i ? currentTheme.primary : currentTheme.primary + '22',
                background: hovered === i
                  ? `linear-gradient(135deg, ${currentTheme.surface}, ${currentTheme.primary}11)`
                  : `rgba(0,0,0,0.3)`,
                boxShadow: hovered === i ? `0 0 30px ${currentTheme.glow}, 0 8px 32px rgba(0,0,0,0.4)` : '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              {/* Top accent line */}
              <div
                className="project-accent-line"
                style={{
                  background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.accent})`,
                  opacity: hovered === i ? 1 : 0.4,
                }}
              />

              <div className="project-icon-wrap">
                <span className="project-icon">{project.icon}</span>
              </div>

              <h3 className="project-name" style={{ color: currentTheme.accent }}>{project.name}</h3>
              <p className="project-subtitle" style={{ color: currentTheme.primary }}>{project.subtitle}</p>
              <p className="project-desc">{project.description}</p>

              <div className="project-tech-stack">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="tech-badge"
                    style={{
                      background: currentTheme.primary + '18',
                      borderColor: currentTheme.primary + '44',
                      color: currentTheme.primary,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* GitHub Link */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-github-btn"
                  style={{
                    borderColor: currentTheme.primary + '66',
                    color: currentTheme.primary,
                    background: currentTheme.primary + '12',
                    boxShadow: hovered === i ? `0 0 14px ${currentTheme.glow}` : 'none',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="gh-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>View on GitHub</span>
                  <span className="gh-arrow">↗</span>
                </a>
              )}

              {/* Corner decoration */}
              <div
                className="project-corner"
                style={{
                  borderColor: currentTheme.primary,
                  opacity: hovered === i ? 0.8 : 0.2,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
