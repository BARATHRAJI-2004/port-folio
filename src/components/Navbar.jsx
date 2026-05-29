import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import PersonaSwitcher from './PersonaSwitcher';
import logoImg from '../assets/logo.png';

const NAV_ITEMS = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

export default function Navbar() {
  const { currentTheme, persona } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        borderBottomColor: scrolled ? currentTheme.primary + '44' : 'transparent',
        background: scrolled
          ? `rgba(0,0,0,0.85)`
          : 'transparent',
      }}
    >
      <div className="navbar-inner">
        {/* Logo Image */}
        <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src={logoImg}
            alt="BR Logo"
            className="navbar-logo-img"
            style={{ filter: `drop-shadow(0 0 8px ${currentTheme.glow})` }}
          />
        </div>

        {/* Persona Switcher (center) */}
        <div className="navbar-persona">
          <PersonaSwitcher />
        </div>

        {/* Right: Nav + Theme */}
        <div className="navbar-right">
          <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                className="nav-link"
                onClick={() => scrollTo(item)}
                style={{ '--link-color': currentTheme.primary }}
              >
                {item}
              </button>
            ))}
          </div>
          <ThemeSwitcher />
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ background: currentTheme.primary }} />
            <span style={{ background: currentTheme.primary }} />
            <span style={{ background: currentTheme.primary }} />
          </button>
        </div>
      </div>
    </nav>
  );
}
