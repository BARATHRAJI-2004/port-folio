import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/* ── Theme → unique animation class map ── */
const THEME_ANIM = {
  blue:    'drift-slide-right',
  green:   'drift-matrix',
  purple:  'drift-spin-in',
  red:     'drift-fire',
  orange:  'drift-bounce',
  cyan:    'drift-glitch',
  pink:    'drift-pop',
  gold:    'drift-royal',
  indigo:  'drift-warp',
  teal:    'drift-wave',
  crimson: 'drift-shockwave',
  lime:    'drift-electric',
};

function SkillSlide({ skill, color, glow, index, themeId, isActive, isComing, isLeaving }) {
  const animClass = THEME_ANIM[themeId] || 'drift-slide-right';

  return (
    <div
      className={`skill-slide ${isActive ? 'skill-slide-active' : ''} ${isComing ? `skill-slide-in ${animClass}` : ''} ${isLeaving ? 'skill-slide-out' : ''}`}
      style={{
        '--slide-color': color,
        '--slide-glow': glow,
        borderColor: color + '33',
        background: `linear-gradient(135deg, ${color}0a, ${color}18)`,
        boxShadow: isActive ? `0 0 40px ${glow}, 0 0 80px ${glow}40, inset 0 1px 0 ${color}44` : 'none',
      }}
    >
      {/* Speed streak lines (race car effect) */}
      <div className="speed-streaks">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="streak" style={{ background: color, animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      {/* Tachometer arc */}
      <div className="tacho-wrap">
        <svg className="tacho-svg" viewBox="0 0 120 70">
          <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke={color + '22'} strokeWidth="8" strokeLinecap="round" />
          <path
            d="M 10 60 A 50 50 0 0 1 110 60"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(skill.level / 100) * 157} 157`}
            style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dasharray 1.4s cubic-bezier(0.4,0,0.2,1)' }}
          />
          <text x="60" y="58" textAnchor="middle" fill={color} fontSize="18" fontWeight="800" fontFamily="'JetBrains Mono', monospace">
            {skill.level}
          </text>
          <text x="60" y="68" textAnchor="middle" fill={color + '88'} fontSize="7" fontFamily="'JetBrains Mono', monospace">
            RPM%
          </text>
        </svg>
      </div>

      <div className="skill-slide-content">
        <div className="skill-slide-header">
          <span className="skill-slide-category" style={{ color }}>{skill.category}</span>
          <div className="skill-slide-speed-badge" style={{ borderColor: color + '55', color }}>
            ⚡ {skill.level >= 90 ? 'PRO' : skill.level >= 85 ? 'ADV' : 'INT'}
          </div>
        </div>

        {/* Progress bar */}
        <div className="skill-bar-bg" style={{ marginBottom: '1rem' }}>
          <div
            className="skill-bar-fill skill-bar-animated"
            style={{
              width: isActive ? `${skill.level}%` : '0%',
              background: `linear-gradient(90deg, ${color}88, ${color}, ${color}cc)`,
              boxShadow: `0 0 14px ${glow}`,
            }}
          />
        </div>

        <div className="skill-tags">
          {skill.items.map((item, i) => (
            <span
              key={item}
              className="skill-tag skill-tag-drift"
              style={{
                borderColor: color + '44',
                color: color + 'cc',
                animationDelay: `${i * 0.06}s`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Checkered flag corner */}
      <div className="checkered-corner" style={{ '--cc': color }}>
        <div className="cc-flag">🏁</div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { currentTheme, persona } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const [comingIdx, setComingIdx] = useState(null);
  const [leavingIdx, setLeavingIdx] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  const skills = persona.skills;
  const total = skills.length;

  const goTo = (nextIdx) => {
    if (isAnimating || nextIdx === activeIdx) return;
    setIsAnimating(true);
    setLeavingIdx(activeIdx);
    setComingIdx(nextIdx);
    setTimeout(() => {
      setActiveIdx(nextIdx);
      setLeavingIdx(null);
      setComingIdx(null);
      setIsAnimating(false);
    }, 650);
  };

  // Auto-slide like a race
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % total;
        setIsAnimating(true);
        setLeavingIdx(prev);
        setComingIdx(next);
        setTimeout(() => {
          setLeavingIdx(null);
          setComingIdx(null);
          setIsAnimating(false);
        }, 650);
        return next;
      });
    }, 3200);
    return () => clearInterval(timerRef.current);
  }, [total]);

  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title" style={{ color: currentTheme.primary }}>
            Technical Skills
          </h2>
          <div className="section-line" style={{ background: `linear-gradient(90deg, ${currentTheme.primary}, transparent)` }} />
        </div>

        {/* Race track label */}
        <div className="race-track-label" style={{ color: currentTheme.primary }}>
          <span className="rtl-flag">🏎️</span>
          <span>Skill Speedway — {skills[activeIdx]?.category}</span>
          <span className="rtl-lap">Lap {activeIdx + 1}/{total}</span>
        </div>

        {/* Slideshow arena */}
        <div className="skills-slideshow" style={{ '--theme-color': currentTheme.primary, '--theme-glow': currentTheme.glow }}>
          {/* Track lines */}
          <div className="track-lines">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="track-line" style={{ background: currentTheme.primary + '15' }} />
            ))}
          </div>

          {/* Slides */}
          <div className="slides-container">
            {skills.map((skill, i) => (
              <SkillSlide
                key={skill.category}
                skill={skill}
                color={currentTheme.primary}
                glow={currentTheme.glow}
                index={i}
                themeId={currentTheme.id}
                isActive={i === activeIdx}
                isComing={i === comingIdx}
                isLeaving={i === leavingIdx}
              />
            ))}
          </div>

          {/* Navigation dots (pit stops) */}
          <div className="pit-stops">
            {skills.map((_, i) => (
              <button
                key={i}
                className={`pit-dot ${i === activeIdx ? 'pit-dot-active' : ''}`}
                style={{
                  background: i === activeIdx ? currentTheme.primary : currentTheme.primary + '33',
                  boxShadow: i === activeIdx ? `0 0 12px ${currentTheme.glow}` : 'none',
                }}
                onClick={() => goTo(i)}
                title={skills[i].category}
              />
            ))}
          </div>

          {/* Prev/Next arrows */}
          <button
            className="slide-arrow slide-arrow-prev"
            style={{ borderColor: currentTheme.primary + '55', color: currentTheme.primary }}
            onClick={() => goTo((activeIdx - 1 + total) % total)}
          >◀</button>
          <button
            className="slide-arrow slide-arrow-next"
            style={{ borderColor: currentTheme.primary + '55', color: currentTheme.primary }}
            onClick={() => goTo((activeIdx + 1) % total)}
          >▶</button>
        </div>

        {/* Mini grid below: all skill category names */}
        <div className="skills-mini-grid">
          {skills.map((skill, i) => (
            <button
              key={skill.category}
              className={`skill-mini-card ${i === activeIdx ? 'skill-mini-active' : ''}`}
              style={{
                borderColor: i === activeIdx ? currentTheme.primary : currentTheme.primary + '22',
                color: i === activeIdx ? currentTheme.primary : '#888',
                background: i === activeIdx ? currentTheme.primary + '15' : 'transparent',
                boxShadow: i === activeIdx ? `0 0 16px ${currentTheme.glow}` : 'none',
              }}
              onClick={() => goTo(i)}
            >
              <span className="smc-name">{skill.category}</span>
              <span className="smc-level" style={{ color: i === activeIdx ? currentTheme.accent : '#555' }}>{skill.level}%</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
