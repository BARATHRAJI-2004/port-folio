import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import profileImg from '../assets/image.png';

const TITLES = {
  softwareDev: ['Full Stack Developer', 'React Engineer', 'PHP / Python Dev', 'Node.js Developer', 'API Architect'],
  csharpDev:   ['C# Developer', '.NET Modernization', 'Backend Engineer', 'REST API Developer', 'Legacy Refactoring Expert'],
  cybersec:    ['Cybersecurity Professional', 'SOC Analyst', 'Penetration Tester', 'Digital Forensics Expert', 'Threat Intelligence Analyst'],
};

function TypewriterText({ texts, color }) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setDisplay('');
    setIdx(0);
    setCharIdx(0);
    setDeleting(false);
  }, [texts]);

  useEffect(() => {
    const current = texts[idx % texts.length];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    setDisplay(current.substring(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span style={{ color }}>
      {display}
      <span className="cursor" style={{ borderColor: color }}>|</span>
    </span>
  );
}

export default function Hero() {
  const { currentTheme, persona, currentPersona } = useTheme();

  return (
    <section id="about" className="hero-section">
      {/* Big decorative glow circle */}
      <div
        className="hero-glow"
        style={{ background: `radial-gradient(circle, ${currentTheme.glow} 0%, transparent 70%)` }}
      />

      <div className="hero-content">
        {/* Avatar */}
        <div
          className="hero-avatar-wrap"
          style={{ borderColor: currentTheme.primary, boxShadow: `0 0 40px ${currentTheme.glow}, 0 0 80px ${currentTheme.glow}40` }}
        >
          <div
            className="hero-avatar"
            style={{ background: `linear-gradient(135deg, ${currentTheme.secondary}, ${currentTheme.primary})` }}
          >
            <img src={profileImg} alt="Barathraji P" className="hero-avatar-photo" />
            <div className="avatar-ring" style={{ borderColor: currentTheme.accent + '60' }} />
          </div>
          <div
            className="hero-badge"
            style={{ background: currentTheme.primary, boxShadow: `0 0 12px ${currentTheme.glow}` }}
          >
            {persona.icon}
          </div>
        </div>


        {/* Text Content */}
        <div className="hero-text">
          <div className="hero-greeting" style={{ color: currentTheme.accent }}>
            {persona.accentGlyph} Hello, I'm
          </div>
          <h1 className="hero-name" style={{ textShadow: `0 0 30px ${currentTheme.glow}` }}>
            {persona.name}
          </h1>
          <div className="hero-typewriter">
            <TypewriterText texts={TITLES[currentPersona]} color={currentTheme.primary} />
          </div>
          <p className="hero-summary">{persona.summary}</p>

          {/* Contact chips */}
          <div className="hero-contacts">
            <a href={`mailto:${persona.contact.email}`} className="contact-chip" style={{ borderColor: currentTheme.primary + '55', color: currentTheme.accent }}>
              <span>✉</span> {persona.contact.email}
            </a>
            <a href={`tel:${persona.contact.phone}`} className="contact-chip" style={{ borderColor: currentTheme.primary + '55', color: currentTheme.accent }}>
              <span>📞</span> {persona.contact.phone}
            </a>
            <a href={`https://wa.me/91${persona.contact.whatsapp}`} target="_blank" rel="noreferrer" className="contact-chip" style={{ borderColor: currentTheme.primary + '55', color: currentTheme.accent }}>
              <span>💬</span> WhatsApp
            </a>
            <a href={`https://${persona.contact.instagram}`} target="_blank" rel="noreferrer" className="contact-chip" style={{ borderColor: currentTheme.primary + '55', color: currentTheme.accent }}>
              <span>📸</span> Instagram
            </a>
            <a href={`https://${persona.contact.github}`} target="_blank" rel="noreferrer" className="contact-chip" style={{ borderColor: currentTheme.primary + '55', color: currentTheme.accent }}>
              <span>⌨</span> GitHub
            </a>
            <a href={`https://${persona.contact.linkedin}`} target="_blank" rel="noreferrer" className="contact-chip" style={{ borderColor: currentTheme.primary + '55', color: currentTheme.accent }}>
              <span>🔗</span> LinkedIn
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <button
              className="btn-primary"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                boxShadow: `0 0 20px ${currentTheme.glow}`,
              }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects 🚀
            </button>
            <button
              className="btn-outline"
              style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me ✉
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ borderColor: currentTheme.primary + '66' }}>
        <div className="scroll-dot" style={{ background: currentTheme.primary }} />
      </div>
    </section>
  );
}
